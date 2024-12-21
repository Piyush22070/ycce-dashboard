import { NextResponse } from "next/server";
import { Site } from "@/models/Site.model";
import connectDB from "@/db";

// DELETE handler for deleting a site by its ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    // Connect to the database
    await connectDB();

    const { id } = params; // Extract the ID from the URL path parameter

    if (!id) {
      return NextResponse.json(
        { message: "Site ID is required" },
        { status: 400 }
      );
    }

    // Find and delete the site by ID
    const siteToDelete = await Site.findByIdAndDelete(id);

    if (!siteToDelete) {
      return NextResponse.json(
        { message: "Site not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Site with ID ${id} successfully deleted` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting site:", error);
    return NextResponse.json(
      { message: "Failed to delete site", error: error.message },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
      // Connect to the database
      await connectDB();
  
      const { id } = params; // Extract `id` from the dynamic URL parameters
      const body = await req.json(); // Parse the body data for the update
  
      if (!id) {
        return NextResponse.json({ message: "Site ID is required" }, { status: 400 });
      }
  
      // Update the site document in the database
      const updatedSite = await Site.findByIdAndUpdate(
        id,
        {
          $set: {
            amount: body.amount,
            status: body.status,
            Location: body.Location,
            date: body.date,
            PhoneNo: body.PhoneNo,
            email: body.email,
            sitePlan: body.sitePlan,
            labourInvolved: body.labourInvolved,
            startDate: body.startDate,
            endDate: body.endDate,
            description: body.description,
          },
        },
        { new: true } // This ensures that the updated document is returned
      );
  
      if (!updatedSite) {
        return NextResponse.json({ message: "Site not found" }, { status: 404 });
      }
  
      return NextResponse.json(
        { message: "Site data successfully updated", site: updatedSite },
        { status: 200 }
      );
    } catch (error: any) {
      console.error("Error updating site:", error);
      return NextResponse.json(
        { message: "Failed to update site", error: error.message },
        { status: 500 }
      );
    }
  }
  