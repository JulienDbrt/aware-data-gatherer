import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ContentCard from "@/components/ContentCard";
import ContentDetail from "@/components/ContentDetail";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Item, api } from "@/services/api";
import { mockItems } from "@/utils/mockData";
import { Rss, BarChart, Settings, Cpu } from "lucide-react";

const Index = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // In a real app, we would use the API:
        // const data = await api.items.getAll(5);
        // setItems(data);
        
        // For development, use mock data:
        setItems(mockItems.slice(0, 4));
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

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome to Aggregator</h1>
          <p className="text-gray-600 text-lg">
            Your AI-powered content hub with summarization and knowledge graph visualization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Rss className="h-5 w-5 text-aggregator-blue" />
                Latest Content
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600">
                Browse the most recent items from your content sources
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/items">
                <Button variant="outline">Browse All Items</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart className="h-5 w-5 text-aggregator-purple" />
                Knowledge Graph
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600">
                Discover connections between concepts in your content
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/graph">
                <Button variant="outline">View Graph</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5 text-aggregator-indigo" />
                Manage Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600">
                Add, edit, or remove content sources to customize your feed
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/sources">
                <Button variant="outline">Manage Sources</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Cpu className="h-5 w-5 text-aggregator-blue" />
                AI Summaries
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600">
                Content automatically summarized by AI for quick scanning
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/items">
                <Button variant="outline">See Summaries</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Items</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent className="space-y-2 pb-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                  </CardContent>
                  <div className="mt-auto">
                    <CardFooter className="border-t pt-4 pb-3">
                      <div className="w-full flex justify-between">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-5 w-1/4" />
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.length > 0 ? (
                items.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    onClick={handleItemClick}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  <p>No items found. Add some sources to get started.</p>
                  <Link to="/sources" className="mt-2 inline-block">
                    <Button variant="outline">Add Sources</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {items.length > 0 && (
            <div className="mt-6 text-center">
              <Link to="/items">
                <Button>View All Items</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <ContentDetail
        item={selectedItem}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </Layout>
  );
};

export default Index;
