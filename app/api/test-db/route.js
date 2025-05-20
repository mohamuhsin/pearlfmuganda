// app/api/test-db/route.js
import { connectDB } from "@/lib/db";

export async function GET() {
    try {
        await connectDB();
        return Response.json({
            success: true,
            message: "MongoDB connection successful ✅",
        });
    } catch (error) {
        console.error("MongoDB connection failed ❌:", error);
        return Response.json(
            { success: false, error: "MongoDB connection failed" },
            { status: 500 }
        );
    }
}
