
import { toast } from "@/components/ui/use-toast";

export interface Source {
  id: number;
  name: string;
  url: string;
  type: 'rss' | 'json';
  enabled: boolean;
  last_fetch: string | null;
}

export interface SourceCreate {
  name: string;
  url: string;
  type: 'rss' | 'json';
}

export interface Item {
  id: number;
  source_id: number;
  title: string;
  link: string;
  summary: string | null;
  published_at: string | null;
  created_at?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: string;
}

// For local development, we'll use a mock server
const BASE_URL = 'http://localhost:8000';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Network error' }));
    throw new Error(error.detail || `API error: ${response.status}`);
  }
  return response.json();
};

export const api = {
  sources: {
    async getAll(): Promise<Source[]> {
      try {
        const response = await fetch(`${BASE_URL}/sources`);
        return await handleResponse(response);
      } catch (error) {
        console.error('Failed to fetch sources:', error);
        toast({
          title: "Error fetching sources",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        });
        return [];
      }
    },

    async create(source: SourceCreate): Promise<Source> {
      try {
        const response = await fetch(`${BASE_URL}/sources`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(source),
        });
        return await handleResponse(response);
      } catch (error) {
        console.error('Failed to create source:', error);
        toast({
          title: "Error creating source",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        });
        throw error;
      }
    },

    async refresh(sourceId: number): Promise<void> {
      try {
        const response = await fetch(`${BASE_URL}/refresh/${sourceId}`, {
          method: 'POST',
        });
        await handleResponse(response);
        toast({
          title: "Source refresh scheduled",
          description: "The source will be updated shortly.",
        });
      } catch (error) {
        console.error('Failed to refresh source:', error);
        toast({
          title: "Error refreshing source",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        });
      }
    }
  },

  items: {
    async getAll(limit = 50): Promise<Item[]> {
      try {
        const response = await fetch(`${BASE_URL}/items?limit=${limit}`);
        return await handleResponse(response);
      } catch (error) {
        console.error('Failed to fetch items:', error);
        toast({
          title: "Error fetching content items",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        });
        return [];
      }
    }
  },

  graph: {
    async getEdges(limit = 500): Promise<GraphEdge[]> {
      try {
        const response = await fetch(`${BASE_URL}/graph?limit=${limit}`);
        return await handleResponse(response);
      } catch (error) {
        console.error('Failed to fetch graph data:', error);
        toast({
          title: "Error fetching graph data",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        });
        return [];
      }
    }
  }
};
