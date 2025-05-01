import { useNftsData } from "@/hooks/useNftsData";
import AssetCard from "./asset-card";

function AssetList() {
  const { assets, loading, error } = useNftsData();

  if (loading) {
    return <div>Loading assets...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}

export default AssetList;
