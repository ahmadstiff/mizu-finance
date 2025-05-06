export const uploadToCloudinary = async (
  file: File,
  folder: string = "Mizu-Maret"
): Promise<string> => {
  const signRes = await fetch(`/api/sign-cloudinary?folder=${folder}`);
  const { signature, timestamp, apiKey, cloudName } = await signRes.json();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  formData.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await uploadRes.json();

  if (!uploadRes.ok || !result.secure_url) {
    throw new Error(result.error?.message || "Failed to upload image.");
  }

  return result.secure_url;
};
