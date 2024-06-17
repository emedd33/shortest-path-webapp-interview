"use client"; // This is a client component 
import styles from "./page.module.css";
import 'reactflow/dist/style.css';

import { Button, ButtonGroup, Input } from "@mui/material";
import { useEffect, useState } from "react";
import ReactFlow from "reactflow";


export default function Home() {
  const [graph, setGraph] = useState<null|string[][]>(null);
  const [shortestPath, setShortestPath] = useState<string[] | null>(null);
  const [shortestDistance, setShortestDistance] = useState<number|null>(null);
  const [reactFlowNodes, setReactFlowNodes] = useState<any>(null);
  const [reactFlowEdges, setReactFlowEdges] = useState<any>(null);

  const onClick = () => {
    if (!graph) {
      console.error("No graph");
      return;
    }
    fetch("/api/graph", {
      method: "POST",
      body: JSON.stringify({ startNode: "A", endNode: "L", graph: graph }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {console.log(data); setShortestPath(data.shortestPath); setShortestDistance(data.distance);})
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    // creates the nodes and graph for the react flow
    if (graph) {
      
      const nodes = graph.map(([from, to, weight],index) => {
        return { id: from, position: { x: Math.random()*1000, y: Math.random()*1000 }, data: { label: from } };
      });
      
      const edges = graph.map(([from, to, weight]) => {
        if (shortestDistance && shortestPath && shortestPath.includes(from) && shortestPath.includes(to)){
          return { id: `${from}-${to}`, source: from, target: to, animated: true, style: { stroke: 'red' }, label: weight};
        }
        return { id: `${from}-${to}`, source: from, target: to, label: weight};
      });
      setReactFlowEdges(edges);
      setReactFlowNodes(nodes);
    }
  }, [graph, shortestDistance, shortestPath]);
 

  return (
    <main className={styles.main}>
      <div style={{width: '100%', display: 'grid', gridTemplateColumns: '1fr', justifyContent: 'center'}}>

      <h1>Shortest Path</h1>
      <ButtonGroup variant="contained" aria-label="Basic button group" >
        <Button>
          <input type="file" onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const content = e.target?.result;
                if (typeof content === "string") {
                  const graph = content.split("\n").slice(1).map((line) => {
                    const [from, to, weight] = line.split(";");
                    return [from, to, weight];
                  });
                  setGraph(graph);
                }
              };
              reader.readAsText(file);
            }
          } } />
        </Button>
        <Button disabled={!graph} onClick={onClick}>Find path</Button>
        
      </ButtonGroup>
      {reactFlowNodes && reactFlowEdges && (

        <div style={{ width: '100%', height: '70vh', backgroundColor: 'white', borderRadius: '10px' }}>
        <ReactFlow nodes={reactFlowNodes} edges={reactFlowEdges} />
        <h2>Path: {shortestPath}</h2>
        <h3>Distance: {shortestDistance}</h3>
      </div>
      )}
      </div>
    </main>
  );
}
