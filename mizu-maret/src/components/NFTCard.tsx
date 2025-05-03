import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

interface NFTCardProps {
    nftAddress: string;
    title: string;
    thumbnail: string;
    price: string;
    currency: string;
    category: string;
    imageUrl: string;
}

export function NFTCard({ nftAddress, title, thumbnail, price, currency, category, imageUrl }: NFTCardProps) {
    const [hovered, setHovered] = useState(false);

    // Determine the image source, defaulting to thumbnail if imageUrl is empty
    const imageSrc = hovered && imageUrl && imageUrl !== '' ? imageUrl : thumbnail && thumbnail !== '' ? thumbnail : '/placeholder.png';

    return (
        <Card
            className="w-[300px] h-[340px] rounded-sm bg-white border-2 border-gray-200 overflow-hidden shadow-lg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <CardContent className="p-0 flex flex-col flex-1">
                <div className="relative w-full flex items-center justify-center overflow-hidden mx-auto">
                    <Image
                        src={imageSrc}
                        alt={title}
                        className="object-contain w-full h-64 rounded-sm transition-all duration-300"
                        width={256}
                        height={256}
                    />
                </div>
                <Link href={`/asset-detail/${nftAddress}`}>
                    <div className="bg-blue-700 text-gray-100 mt-auto p-4 rounded-b-sm flex flex-col gap-2 cursor-pointer">
                        <div className="text-xl text-gray-100 font-semibold">{title}</div>
                        <div className="flex justify-between">
                            <div className="text-lg font-bold">
                                {price} {currency}
                            </div>
                            <div className="text-md text-gray-200">{category}</div>
                        </div>
                    </div>
                </Link>
            </CardContent>
        </Card>
    );
}