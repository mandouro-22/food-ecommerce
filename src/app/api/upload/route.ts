import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

type FormDataFile = Blob & {
  name: string;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as FormDataFile | null;
    const pathName = formData.get("pathName") as string;

    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 400 });
    }

    // convert the file to a format cloudinary can handle Buffer or Base64
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer).toString("base64");

    // upload the file to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer}`,
      {
        folder: pathName,
        quality: "auto:eco",
        transformation: [
          { width: 200, height: 200, crop: "fill", gravity: "face" },
        ],
      }
    );
    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Error in upload route ❌ " + error);
    return NextResponse.json(
      { message: "Field to upload image" },
      { status: 500 }
    );
  }
}
