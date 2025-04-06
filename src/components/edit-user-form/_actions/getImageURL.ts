export async function getImageURL(imageFile: File) {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathName", "profile_images");

  try {
    const res = await fetch(`http://localhost:3000/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to upload image");
    }

    const image = (await res.json()) as { url: string };
    console.log(image);

    return image.url;
  } catch (error) {
    console.error("Error in getImageURL ❌ " + error);
  }
}
