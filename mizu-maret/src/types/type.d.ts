interface InfoCardProps {
  label: string;
  value: any;
  copyable?: boolean;
  hasLink?: boolean;
}

interface NftFormData {
  title: string;
  description: string;
  owner: string;
  nftId: string;
  nftAddress: string;
  tags: string;
  thumbnail: string;
  imageUrl: string;
  price: string;
  currency: string;
  category: string;
  status: string;
}
interface NFTFormProps {
  onSubmit: SubmitHandler<NftFormData>;
  defaultValues?: NftFormData;
  loading: boolean;
}

interface AssetCardProps {
  asset: {
    id: number;
    title: string;
    description: string;
    owner: string;
    nftId: string;
    nftAddress: string;
    tags: string | null;
    thumbnail: string;
    imageUrl: string;
    price: string;
    currency: string;
    category: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Asset {
  id: number;
  title: string;
  description: string;
  owner: string;
  nftId: string;
  nftAddress: string;
  tags: string | null;
  thumbnail: string;
  imageUrl: string;
  price: string;
  currency: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export { InfoCardProps, NftFormData, NFTFormProps, AssetCardProps, Asset };
