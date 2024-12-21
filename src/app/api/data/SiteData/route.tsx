import { NextResponse } from "next/server";
import { Site } from "@/models/Site.model"; 
import connectDB from "@/db";

export async function GET() {
  try {
    await connectDB();
    
    const sites = await Site.find().sort({ createdAt: -1 });
    
    if (sites.length === 0) {
      return NextResponse.json({ message: "No sites found" }, { status: 404 });
    }

    return NextResponse.json(sites, { status: 200 });
    
  } 
  catch (error: unknown) {
    if (error instanceof Error) {
      // Now TypeScript knows that `error` has a `message` property
      console.error("Error fetching sites:", error.message);
      return NextResponse.json(
        { message: "Failed to fetch site data", error: error.message },
        { status: 500 }
      );
    } 
  }
}

export async function POST(req: Request) {
  try {
    await connectDB(); 
    
    const body = await req.json();
    
    const { 
      id, 
      amount, 
      status, 
      Location, 
      date, 
      PhoneNo, 
      email, 
      sitePlan, 
      labourInvolved, 
      startDate, 
      endDate, 
      description 
    } = body;

    // Validate the body data
    if (!id || !amount || !status || !Location || !date || !PhoneNo || !email || !sitePlan || !labourInvolved || !startDate || !endDate || !description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new site entry
    const newSite = new Site({
      id,
      amount,
      status,
      Location,
      date,
      PhoneNo,
      email,
      sitePlan,
      labourInvolved,
      startDate,
      endDate,
      description,
    });

    await newSite.save();

    return NextResponse.json(
      { message: "Site data successfully added", site: newSite },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      // If the error is an instance of Error, we can safely access its message
      console.error("Error processing request:", error.message);
      return NextResponse.json(
        { message: "Error processing request", error: error.message },
        { status: 500 }
      );
    } else {
      // If the error is not an instance of Error, handle it here
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { message: "Error processing request", error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
