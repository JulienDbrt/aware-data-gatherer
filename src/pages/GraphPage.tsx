
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import GraphVisualization from "@/components/GraphVisualization";
import { GraphEdge, api } from "@/services/api";
import { mockGraphEdges } from "@/utils/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RefreshCcw } from "lucide-react";

const GraphPage = () => {
  const [graphData, setGraphData] = useState<GraphEdge[]>([]);
  const [loading, setLoading] = useState(true);
  const [nodeLimit, setNodeLimit] = useState(100);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        // In a real app, we would use the API:
        // const data = await api.graph.getEdges(nodeLimit);
        // setGraphData(data);
        
        // For development, use mock data:
        setGraphData(mockGraphEdges);
      } catch (error) {
        console.error("Failed to fetch graph data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, [nodeLimit]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Knowledge Graph</h1>
          <Button 
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setLoading(true)}
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
        
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="text-sm font-medium">Node Limit:</div>
            <div className="flex-1 max-w-xs">
              <Slider
                defaultValue={[nodeLimit]}
                min={10}
                max={500}
                step={10}
                onValueChange={(values) => setNodeLimit(values[0])}
              />
            </div>
            <div className="text-sm">{nodeLimit} nodes</div>
          </div>
          
          <CardContent className="p-0">
            {loading ? (
              <div className="h-[600px] flex items-center justify-center">
                <Skeleton className="h-full w-full" />
              </div>
            ) : (
              <GraphVisualization data={graphData} />
            )}
          </CardContent>
        </Card>
        
        <div className="bg-gray-50 p-4 rounded-lg border text-sm text-gray-600">
          <p className="font-medium mb-2">About the Knowledge Graph:</p>
          <p>
            This graph visualizes connections between concepts mentioned together in content summaries. 
            Each node represents a concept or entity, and connections indicate relationships between them.
            You can drag nodes to reorganize the graph and zoom in/out for better visibility.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default GraphPage;
