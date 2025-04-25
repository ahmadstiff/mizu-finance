import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InfoCardProps } from "@/types/type";
import { Copy } from "lucide-react";


function InfoCard({ label, value, copyable = false, hasLink = false }: InfoCardProps) {
  return (
    <Card className="bg-gray-50 border border-gray-100">
      <CardContent className="p-4">
        <div className="text-gray-500 text-sm mb-1">{label}</div>
        <div className="flex items-center gap-2">
          <div className="text-lg font-medium">{value}</div>
          {copyable && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full"
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="sr-only">Copy</span>
            </Button>
          )}
          {hasLink && (
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              visit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
export default InfoCard;