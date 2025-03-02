
import { Asset } from "@/types";
import AssetCard from "./AssetCard";

interface AssetListProps {
  assets: Asset[];
}

const AssetList = ({ assets }: AssetListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
};

export default AssetList;
