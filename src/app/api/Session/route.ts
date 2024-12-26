import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Ensure this path is correct

export async function GET(req: Request) {
  try {
    // Get the session from the request using `getServerSession`
    const session = await getServerSession(authOptions);

    if (!session) {
      // Return Unauthorized if session is not found
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // If session is found, return success message with user details
    return NextResponse.json(
      {
        message: "Success",
        user: session.user?.name || "Unknown User",
        email: session.user?.email || "No Email",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      // Handle unexpected errors and provide a detailed error message
      console.error("Error fetching session:", error.message);
      return NextResponse.json(
        { message: "Failed to fetch session", error: error.message },
        { status: 500 }
      );
    }

    // If the error is not an instance of Error, return a generic 500 error
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
