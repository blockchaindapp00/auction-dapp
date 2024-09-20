import { dbConnect } from "@/app/api/middlewares/mongodb";
import Item from "@/app/api/models/Item";
import User from "@/app/api/models/User";
import mongoose from "mongoose";

export const GET = async (req: Request, { params }: { params: { userSlug: string } }): Promise<Response> => {
    await dbConnect();

    const { userSlug } = params;

    try {
        const user = await User.findOne({ username: userSlug });
        if (!user) {
            return new Response(
                JSON.stringify({ message: "User not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        const items = await Item.find({ posted_by: user._id, isCompleted: true });
        if (items.length === 0) {
            return new Response(
                JSON.stringify({ items: [] }), // Return empty array instead of error
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }

        // Map items to the expected structure
        const responseItems = items.map(item => ({
            title: item.title,
            description: item.description,
            price: item.highest_bid, // or whatever price you want to send
            img: item.image,
            person: user.username, // Assuming you want to show the username as person
            timestamp: item.start_time_stamp.toISOString(), // Use ISO string format for timestamp
        }));

        return new Response(
            JSON.stringify({ items: responseItems }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error fetching posted items:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
