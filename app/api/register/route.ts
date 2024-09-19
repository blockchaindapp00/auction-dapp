import { dbConnect } from "../middlewares/mongodb";
import User from "../models/User";
import bcrypt from "bcrypt";

interface RegisterRequestBody {
    email: string;
    username: string;
    password: string;
    public_address: string;
}

interface UserResponse {
    email: string;
    username: string;
    public_address: string;
    registered_date: string; 
}

const SALT_ROUNDS = 10;

export const POST = async (req: Request): Promise<Response> => {
    await dbConnect();

    try {
        const { email, username, password, public_address }: RegisterRequestBody = await req.json();

        // Validate request body
        if (!email || !username || !password || !public_address) {
            return new Response(
                JSON.stringify({ message: "All fields (email, username, password, public_address) are required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return new Response(
                JSON.stringify({ message: "Email or username already in use" }),
                { status: 409, headers: { "Content-Type": "application/json" } }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create new user
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            public_address,
            registered_date: new Date(),
            owned_items: [],
            sold_items: []
        });

        await newUser.save();

        // Format the registered_date
        const formattedDate = newUser.registered_date.toISOString().split('T')[0]; // Format as YYYY-MM-DD

        // Prepare user response
        const userResponse: UserResponse = {
            email: newUser.email,
            username: newUser.username,
            public_address: newUser.public_address,
            registered_date: `Member Since: ${formattedDate}`
        };

        // Send success response
        return new Response(
            JSON.stringify({ message: "User registered successfully", user: userResponse }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
