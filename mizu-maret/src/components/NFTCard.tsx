import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface NFTCardProps {
    id: number;
    title: string;
    thumbnail: string;
    price: string;
    currency: string;
    category: string;
}

export function NFTCard({ id, title, thumbnail, price, currency, category }: NFTCardProps) {
    return (
        <Link href={`/asset-detail/${id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                    <div className="aspect-square relative">
                        <Image
                            src={thumbnail}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2 p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
                    <div className="flex justify-between items-center w-full">
                        <span className="text-sm text-gray-500">{category}</span>
                        <span className="font-medium">
                            {price} {currency}
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
} 