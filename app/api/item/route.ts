import { dbConnect } from '../middlewares/mongodb'; 
import Item from '../models/Item'; 

interface AddItemRequestBody {
    title: string;
    startingBid: string;
    description: string;
    image: string;
    bidEndDate: string; // This represents the end time/date for the bidding
    userId: string; // The ID of the user posting the item
}

interface AddItemResponse {
    message: string;
    item?: {
        title: string;
        start_price: number;
        description: string;
        image: string;
        timing: number; // Time duration (in seconds or minutes) until the auction ends
        start_time_stamp: string;
        highest_bid: number;
        posted_by: string;
    };
}

export const POST = async (req: Request): Promise<Response> => {
    await dbConnect();

    try {
        const {
            title,
            startingBid,
            description,
            image,
            bidEndDate,
            userId
        }: AddItemRequestBody = await req.json();
        console.log("Item data:", title, startingBid, description, image, bidEndDate, userId);
        // Validate request body
        if (!title || !startingBid || !description || !image || !bidEndDate || !userId) {
            return new Response(
                JSON.stringify({ message: "All fields (title, startingBid, description, image, bidEndDate, userId) are required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Calculate the auction's timing (duration in seconds/minutes from the start)
        const start_time_stamp = new Date();
        const bidEndDateTime = new Date(bidEndDate);
        //const timing = Math.floor((bidEndDateTime.getTime() - start_time_stamp.getTime()) / 1000); // time duration in seconds
        const timing = bidEndDate.toString();
        // Check if the end time is valid
        // if (timing <= 0) {
        //     return new Response(
        //         JSON.stringify({ message: "Bid end date must be in the future" }),
        //         { status: 400, headers: { "Content-Type": "application/json" } }
        //     );
        // }

        // Create a new item, with `highest_bid` initialized to `startingBid`
        const newItem = new Item({
            title,
            posted_by: userId,
            start_price: Number(startingBid), // Convert starting bid to number
            highest_bid: Number(startingBid), // Initially the highest bid is the starting bid
            description,
            image,
            timing, // Auction duration in seconds
            start_time_stamp,
            isCompleted: false
        });

        await newItem.save();

        // Prepare the response
        const itemResponse = {
            title: newItem.title,
            start_price: newItem.start_price,
            description: newItem.description,
            image: newItem.image,
            timing: newItem.timing,
            start_time_stamp: newItem.start_time_stamp.toISOString(),
            highest_bid: newItem.highest_bid,
            posted_by: newItem.posted_by.toString()
        };

        return new Response(
            JSON.stringify({ message: "Item added successfully", item: itemResponse }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Item addition error:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};

interface GetItemsResponse {
    message: string;
    items: {
        title: string;
        start_price: number;
        highest_bid: number;
        description: string;
        image: string;
        timing: number;
        start_time_stamp: string;
        isCompleted: boolean;
        posted_by: string;
    }[];
    totalItems: number;
}

export const GET = async (req: Request): Promise<Response> => {
    await dbConnect();

    try {
        // Optional: Implement pagination using query params (e.g., ?page=1&limit=10)
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '10', 10);
        const skip = (page - 1) * limit;

        // Fetch only items where isCompleted is false, with pagination
        const items = await Item.find({ isCompleted: false }).skip(skip).limit(limit);
        const totalItems = await Item.countDocuments({ isCompleted: false });

        // Transform items to include only relevant data
        const transformedItems = items.map(item => ({
            title: item.title,
            start_price: item.start_price,
            highest_bid: item.highest_bid,
            description: item.description,
            image: item.image,
            timing: item.timing,
            start_time_stamp: item.start_time_stamp.toISOString(),
            isCompleted: item.isCompleted,
            posted_by: item.posted_by.toString(),
        }));

        const response: GetItemsResponse = {
            message: 'Incomplete items fetched successfully',
            items: transformedItems,
            totalItems,
        };

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching incomplete items:', error);

        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
