
import { useEffect, useRef, useState } from "react";
import { GraphEdge } from "@/services/api";
import { Card } from "@/components/ui/card";
import * as d3 from "d3";

interface GraphVisualizationProps {
  data: GraphEdge[];
}

interface Node {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
  relation: string;
}

const GraphVisualization = ({ data }: GraphVisualizationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const { width } = svgRef.current.getBoundingClientRect();
        setDimensions({
          width,
          height: Math.max(500, width * 0.75),
        });
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Prepare the data
    const uniqueNodes = new Set<string>();
    data.forEach(edge => {
      uniqueNodes.add(edge.source);
      uniqueNodes.add(edge.target);
    });
    
    const nodes: Node[] = Array.from(uniqueNodes).map((id, index) => ({
      id,
      group: Math.floor(Math.random() * 5) + 1, // Random group (1-5)
    }));
    
    const links: Link[] = data.map(edge => ({
      source: edge.source,
      target: edge.target,
      relation: edge.relation,
    }));

    // Set up the simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(dimensions.width / 2, dimensions.height / 2));

    // Create the SVG elements
    const svg = d3.select(svgRef.current);
    
    // Define the arrow marker
    svg.append("defs").selectAll("marker")
      .data(["arrow"])
      .enter().append("marker")
      .attr("id", d => d)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5");
    
    // Add the links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5);
      
    // Add the nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 6)
      .attr("fill", (d: Node) => {
        const colors = ["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"];
        return colors[d.group % colors.length];
      })
      .call((d3.drag() as any)
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);
    
    // Add labels
    const labels = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("x", 8)
      .attr("y", "0.31em")
      .text((d: Node) => d.id)
      .clone(true).lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 3);

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
        
      labels
        .attr("x", (d: any) => d.x + 8)
        .attr("y", (d: any) => d.y);
    });

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    // Clean up on unmount
    return () => {
      simulation.stop();
    };
  }, [data, dimensions]);

  if (data.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500">No graph data available</p>
      </Card>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <svg 
        ref={svgRef} 
        width={dimensions.width} 
        height={dimensions.height}
        className="bg-white"
      />
    </div>
  );
};

export default GraphVisualization;
