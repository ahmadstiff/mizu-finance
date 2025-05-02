export const uploadToCloudinary = async (file: File): Promise<string> => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "z6euuqyl");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dv3z889zh/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();

  if (!res.ok || !result.secure_url) {
    throw new Error("Failed to upload image.");
  }

  return result.secure_url;
};
