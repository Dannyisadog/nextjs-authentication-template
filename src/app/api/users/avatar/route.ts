import { put } from "@vercel/blob";
import { get, update } from "app/repository/user";
import { auth } from "auth";

export const POST = auth(async (req) => {
  if (!req.auth || !req.auth.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { user } = req.auth;

  const dbUser = await get({ email: user.email as string });

  const formData = await req.formData();

  const image = formData.get("image");

  const { name: filename } = image as File;

  if (!image) {
    return Response.json({ error: "Image is required" }, { status: 400 });
  }

  if (!req.body) {
    return Response.json({ message: "Body is required" }, { status: 400 });
  }

  const buffer = Buffer.from(await (image as Blob).arrayBuffer());

  try {
    const blob = await put(`avatars/${dbUser.id}-${filename}`, buffer, {
      access: "public",
    });
    return Response.json({
      url: blob.url,
    });
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "Fail to upload user avatar using vercel/blob" },
      { status: 500 }
    );
  }
});

export const PUT = auth(async (req) => {
  if (!req.auth || !req.auth.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { user } = req.auth;

  const dbUser = await get({ email: user.email as string });

  const { image } = await req.json();

  if (!image) {
    return Response.json({ error: "Image url is required" }, { status: 400 });
  }

  try {
    await update({
      id: dbUser.id,
      image,
    });
    return Response.json({ message: "User updated" }, { status: 201 });
  } catch (e) {
    console.log(e);
    return Response.json({ message: "Fail to update user" }, { status: 500 });
  }
});
