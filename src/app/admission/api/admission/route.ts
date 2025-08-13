// app/admission/api/admission/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // TODO: Validate data here

    // TODO: Save data to database here
    console.log("Received admission data:", data);

    return NextResponse.json({ message: "Admission saved successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save admission" }, { status: 500 });
  }
}
