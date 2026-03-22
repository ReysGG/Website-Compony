import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    // 1. Check Authentication (Clerk)
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse FormData
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 3. Prepare File for Upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename using timestamp and replacing spaces
    const uniqueId = Date.now().toString() + "-" + Math.round(Math.random() * 1e9);
    const fileName = `${uniqueId}-${file.name.replace(/\s+/g, "_")}`;
    const filePath = `admin-uploads/${fileName}`; // Placing inside a folder

    // 4. Upload to Supabase Storage
    // Asumsikan bucket bernama "assets" sudah dibuat dan public
    const { data, error } = await supabaseAdmin.storage
      .from("assets") // bucket name
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      throw error;
    }

    // 5. Get Public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from("assets")
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload" }, { status: 500 });
  }
}
