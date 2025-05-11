
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Item } from "@/services/api";
import { Calendar, ExternalLink } from "lucide-react";

interface ContentCardProps {
  item: Item;
  onClick: (item: Item) => void;
}

const ContentCard = ({ item, onClick }: ContentCardProps) => {
  // Format date
  const formattedDate = item.published_at 
    ? new Date(item.published_at).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      })
    : null;
  
  // Extract keywords from summary (in our mock data they are listed after "Mots-clés:")
  const keywords: string[] = [];
  if (item.summary) {
    const keywordsMatch = item.summary.match(/Mots-clés: (.*?)$/m);
    if (keywordsMatch && keywordsMatch[1]) {
      keywords.push(...keywordsMatch[1].split(', '));
    }
  }

  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-2">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        {item.summary ? (
          <div>
            <p className="text-sm text-gray-600 line-clamp-4">{item.summary.split('Mots-clés:')[0]}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No summary available</p>
        )}
      </CardContent>
      <div className="mt-auto">
        <Separator />
        <CardFooter className="pt-3 pb-3 flex flex-col items-start gap-2">
          <div className="w-full flex flex-wrap gap-1">
            {keywords.slice(0, 3).map((keyword, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
            {keywords.length > 3 && (
              <Badge variant="outline" className="text-xs bg-gray-50">
                +{keywords.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="w-full flex justify-between items-center">
            {formattedDate && (
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                {formattedDate}
              </div>
            )}
            
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2"
                onClick={() => onClick(item)}
              >
                Details
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(item.link, '_blank');
                }}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ContentCard;
