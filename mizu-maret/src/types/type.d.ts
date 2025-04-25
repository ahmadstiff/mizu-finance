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
export { InfoCardProps, NftFormData, NFTFormProps };