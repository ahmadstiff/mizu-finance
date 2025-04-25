"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
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

  return (
    <div>
      <h1>Isi API Carts</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre> // tampilkan dalam bentuk JSON
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Page;
