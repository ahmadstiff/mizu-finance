import Image from 'next/image';
import { cn } from '@/lib/utils';
import collectible from '../../public/collectibles.svg'
import commodity from '../../public/commodity.svg'
import credit from '../../public/credit.svg'
import membership from '../../public/membership.jpg'
import realestate from '../../public/realestate.jpg'
import royalty from '../../public/royality.jpg'
import stocks from '../../public/stocks.jpg'

export type Category = 'collectible' | 'comodity' | 'credit' | 'membership' | 'real estate' | 'royality' | 'stocks';

interface CategoryIconsProps {
    selectedCategory: Category | null;
    onSelectCategory: (category: Category | null) => void;
}

const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'collectible', label: 'Collectible', icon: collectible },
    { id: 'comodity', label: 'Commodity', icon: commodity.src },
    { id: 'credit', label: 'Credit', icon: credit.src },
    { id: 'membership', label: 'Membership', icon: membership.src },
    { id: 'real estate', label: 'Real Estate', icon: realestate.src },
    { id: 'royality', label: 'Royality', icon: royalty.src },
    { id: 'stocks', label: 'Stocks', icon: stocks.src },
];

export function CategoryIcons({ selectedCategory, onSelectCategory }: CategoryIconsProps) {
    return (
        <div className="flex flex-wrap gap-4 justify-center items-center py-6">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelectCategory(selectedCategory === category.id ? null : category.id)}
                    className={cn(
                        'flex flex-col items-center gap-2 p-4 rounded-full transition-all cursor-pointer',
                        'hover:bg-blue-100',
                        selectedCategory === category.id && 'bg-blue-200'
                    )}
                >
                    <div className="w-12 h-12 relative">
                        <Image
                            src={category.icon}
                            alt={category.label}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-sm font-medium">{category.label}</span>
                </button>
            ))}
        </div>
    );
} 