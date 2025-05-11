
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ContentCard from "@/components/ContentCard";
import ContentDetail from "@/components/ContentDetail";
import { Item, api } from "@/services/api";
import { mockItems } from "@/utils/mockData";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const ItemsPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // In a real app, we would use the API:
        // const data = await api.items.getAll();
        // setItems(data);
        
        // For development, use mock data:
        setItems(mockItems);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setDetailOpen(true);
  };

  // Filtering logic
  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.summary && item.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === "all") {
      return matchesSearch;
    }
    
    // Filter by source
    return matchesSearch && item.source_id === parseInt(activeTab);
  });

  // Get unique sources
  const sources = [...new Set(items.map(item => item.source_id))];

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Content Items</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search items..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList>
          <TabsTrigger value="all">All Sources</TabsTrigger>
          {sources.map((sourceId) => (
            <TabsTrigger key={sourceId} value={sourceId.toString()}>
              Source {sourceId}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              <div className="pt-2 flex justify-between">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-5 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onClick={handleItemClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500 border rounded-lg">
              <p>No items match your search criteria.</p>
            </div>
          )}
        </>
      )}
      
      <ContentDetail
        item={selectedItem}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </Layout>
  );
};

export default ItemsPage;
