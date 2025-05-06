// hooks/useNftsData.ts
import { useState, useEffect } from "react";
import axios from "axios";
import {Asset} from "@/types/type";

export function useNftsData() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Asset[]>("https://mizu-backend-one.vercel.app/api/nfts/")
      .then((res) => {
        setAssets(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch assets:", err);
        setError("Failed to load assets.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { assets, loading, error };
}

