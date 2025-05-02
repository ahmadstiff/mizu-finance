import { NftFormData } from "@/types/type";

export const postNftData = async (formData: NftFormData): Promise<boolean> => {
  try {
    const res = await fetch("https://mizu-backend-one.vercel.app/api/nfts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      const message = data?.message || "Failed to send data to server.";
      throw new Error(message);
    }

    return true;
  } catch (error) {
    console.error("Submission error:", error);
    return false;
  }
};
