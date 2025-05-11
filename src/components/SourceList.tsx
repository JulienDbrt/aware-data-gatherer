
import { useState } from "react";
import { Source } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { RefreshCcw } from "lucide-react";
import { api } from "@/services/api";
import SourceForm from "./SourceForm";

interface SourceListProps {
  sources: Source[];
  onRefresh: () => void;
}

const SourceList = ({ sources, onRefresh }: SourceListProps) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [refreshingSources, setRefreshingSources] = useState<number[]>([]);

  const handleRefreshSource = async (sourceId: number) => {
    setRefreshingSources((prev) => [...prev, sourceId]);
    await api.sources.refresh(sourceId);
    setRefreshingSources((prev) => prev.filter((id) => id !== sourceId));
  };

  const handleAddSource = () => {
    onRefresh();
    setAddDialogOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Content Sources</h2>
        <Button onClick={() => setAddDialogOpen(true)}>Add Source</Button>
      </div>
      
      <Separator className="my-4" />
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sources.length > 0 ? (
              sources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell className="font-medium">{source.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {source.url}
                    </a>
                  </TableCell>
                  <TableCell>{source.type === 'rss' ? 'RSS Feed' : 'JSON API'}</TableCell>
                  <TableCell>
                    {source.last_fetch 
                      ? new Date(source.last_fetch).toLocaleString() 
                      : 'Never'}
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={source.enabled} 
                      // In a real app, this would update the source status
                      disabled 
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRefreshSource(source.id)}
                      disabled={refreshingSources.includes(source.id)}
                    >
                      <RefreshCcw 
                        className={`h-4 w-4 ${refreshingSources.includes(source.id) ? 'animate-spin' : ''}`} 
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                  No sources found. Add your first source to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Source</DialogTitle>
          </DialogHeader>
          <SourceForm onSuccess={handleAddSource} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SourceList;
