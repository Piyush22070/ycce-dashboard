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
    
  } catch (error: any) {
    console.error("Error fetching sites:", error);
    return NextResponse.json(
      { message: "Failed to fetch site data", error: error.message },
      { status: 500 }
    );
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
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
