"use client";
import React from "react";
import AssetDetailPage from "./detail-card";
import { useParams } from 'next/navigation';

export const Page = () => {
  const params = useParams();
  const assetId = params.id;
  return (
    <>
      <h1>Detail Asset {assetId}</h1>
      <AssetDetailPage />
    </>
  );
};
export default Page;
