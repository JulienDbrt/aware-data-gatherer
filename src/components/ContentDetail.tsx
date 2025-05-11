
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item } from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar, ExternalLink } from "lucide-react";

interface ContentDetailProps {
  item: Item | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContentDetail = ({ item, open, onOpenChange }: ContentDetailProps) => {
  if (!item) return null;

  // Format date
  const formattedDate = item.published_at 
    ? new Date(item.published_at).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : null;

  // Extract summary and keywords
  const summary = item.summary ? item.summary.split('Mots-clés:')[0].trim() : null;
  const keywords: string[] = [];
  if (item.summary) {
    const keywordsMatch = item.summary.match(/Mots-clés: (.*?)$/m);
    if (keywordsMatch && keywordsMatch[1]) {
      keywords.push(...keywordsMatch[1].split(', '));
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{item.title}</DialogTitle>
          {formattedDate && (
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Calendar className="h-4 w-4 mr-1" />
              {formattedDate}
            </div>
          )}
        </DialogHeader>

        <div className="space-y-4 my-2">
          {summary ? (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500">AI-GENERATED SUMMARY</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center text-gray-500 italic">
              No summary available
            </div>
          )}

          {keywords.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500">KEYWORDS</h3>
              <div className="flex flex-wrap gap-1">
                {keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              window.open(item.link, '_blank');
            }}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Visit Original Source
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentDetail;
