import axios from "axios";
import { useState, useEffect } from "react";

export const NftsData = () => {
  const [data, setData] = useState(null); // simpan data API di sini

  useEffect(() => {
    axios
      .get("https://mizu-backend-one.vercel.app/api/nfts/")
      .then((res) => {
        console.log("Isi API:", res.data); // tampilkan di console
        setData(res.data); // simpan ke state agar bisa ditampilkan
      })
      .catch((err) => {
        console.error("Gagal ambil data:", err);
      });
  }, []);

  return data;
};
