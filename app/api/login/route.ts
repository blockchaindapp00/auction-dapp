import { dbConnect } from "../middlewares/mongodb";
import User from "../models/User";
import bcrypt from "bcrypt";

interface RequestBody {
    username?: string;
    email?: string;
    password: string;
}

interface UserResponse {
    username: string;
    email: string;
    public_address: string;
    registered_date: string;
}

export const POST = async (req: Request): Promise<Response> => {
    await dbConnect();

    try {
        const { username, email, password }: RequestBody = await req.json();

        if (!password) {
            return new Response(
                JSON.stringify({ message: "Password is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        if (!username && !email) {
            return new Response(
                JSON.stringify({ message: "Username or email is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return new Response(
                JSON.stringify({ message: "Invalid username/email or password" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return new Response(
                JSON.stringify({ message: "Invalid username/email or password" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const userResponse: UserResponse = {
            username: user.username,
            email: user.email,
            public_address: user.public_address,
            registered_date: user.registered_date.toString(),
        };

        return new Response(
            JSON.stringify({ message: "Login successful", user: userResponse }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Login error:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
