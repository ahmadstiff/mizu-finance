import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface NFTCardProps {
    id: string;
    title: string;
    thumbnail: string;
    status: string;
    tags: string;
    price: string;
    currency: string;
    category: string;
    imageUrl?: string;
}

export function NFTCard({
    id,
    title,
    thumbnail,
    status,
    tags,
    price,
    currency,
    category,
    imageUrl,
}: NFTCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Use thumbnail as fallback if imageUrl is not provided or empty
    const imageSrc = isHovered && imageUrl ? imageUrl : thumbnail || '/placeholder.png';

    // Format tags array to string if it's not already
    const formattedTags = Array.isArray(tags) ? tags.join(', ') : tags;

    return (
        <table className="w-full table-fixed border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
                <tr className="border-b border-gray-200">
                    <th className="w-20 py-4 px-6 text-left font-semibold text-gray-700">Image</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Title</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Category</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Status</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-700">Tags</th>
                    <th className="w-28 py-4 px-6 text-left font-semibold text-gray-700">Price</th>
                    <th className="w-28 py-4 px-6 text-left font-semibold text-gray-700">Currency</th>
                </tr>
            </thead>
            <tbody className="bg-white">
                <tr
                    className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <td className="py-5 px-6">
                        <div className="relative h-16 w-16">
                            <Image
                                src={imageSrc}
                                alt={`${title} NFT thumbnail`}
                                className="rounded-md object-contain transition-all duration-300"
                                width={64}
                                height={64}
                                priority={false}
                                placeholder="blur"
                                blurDataURL="/placeholder.png"
                            />
                        </div>
                    </td>
                    <td className="truncate py-5 px-6">
                        <Link
                            href={`/asset-detail/${id}`}
                            className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                            title={title}
                        >
                            {title}
                        </Link>
                    </td>
                    <td className="py-5 px-6 text-gray-600 truncate">{category}</td>
                    <td className="py-5 px-6 text-gray-600 truncate">{status}</td>
                    <td className="py-5 px-6 text-gray-600 truncate">{tags}</td>
                    <td className="py-5 px-6 font-semibold text-gray-900">{price}</td>
                    <td className="py-5 px-6 font-semibold text-gray-900">{currency}</td>
                </tr>
            </tbody>
        </table>
    );
}