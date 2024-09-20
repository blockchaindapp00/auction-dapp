import { dbConnect } from '@/app/api/middlewares/mongodb';
import Item from '@/app/api/models/Item';
import User from '@/app/api/models/User';
import mongoose from 'mongoose';

export const GET = async (req: Request, { params }: { params: { userSlug: string } }): Promise<Response> => {
    await dbConnect();

    const { userSlug } = params;

    try {
        // Validate the userSlug parameter
        if (!userSlug) {
            return new Response(
                JSON.stringify({ message: "Username is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Find the user by username
        const user = await User.findOne({ username: userSlug });
        if (!user) {
            return new Response(
                JSON.stringify({ message: "User not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        // Find all items posted by the user (owned items)
        const ownedItems = await Item.find({ posted_by: user._id }).lean(); // Use lean() for better performance

        // Check if no owned items found
        if (ownedItems.length === 0) {
            return new Response(
                JSON.stringify({ message: "No owned items found for this user" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ ownedItems }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error fetching owned items:", error);

        // Handle specific database errors
        if (error instanceof mongoose.Error) {
            return new Response(
                JSON.stringify({ message: "Database error occurred", error: error.message }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        // Generic internal server error
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
