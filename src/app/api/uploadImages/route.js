import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
  const formData = await req.formData();

  const imaagesPath = [];

  const files = formData.getAll("images");
  if (files.length === 0) {
    return NextResponse.json({ error: "No files received." });
  }

  try {
    await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + file.name.replaceAll(" ", "_");

        await writeFile(
          path.join(process.cwd(), "public/uploads/" + filename),
          buffer
        );

        const filePath = `/uploads/${filename}`;
        imaagesPath.push(filePath);
      })
    );
    return NextResponse.json({ success: true, path: imaagesPath, status: 200 });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
