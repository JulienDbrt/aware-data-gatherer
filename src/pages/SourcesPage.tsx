
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import SourceList from "@/components/SourceList";
import { Source, api } from "@/services/api";
import { mockSources } from "@/utils/mockData";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SourcesPage = () => {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    setLoading(true);
    try {
      // In a real app, we would use the API:
      // const data = await api.sources.getAll();
      // setSources(data);
      
      // For development, use mock data:
      setSources(mockSources);
    } catch (error) {
      console.error("Failed to fetch sources:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <SourceList sources={sources} onRefresh={fetchSources} />
      )}
    </Layout>
  );
};

export default SourcesPage;
