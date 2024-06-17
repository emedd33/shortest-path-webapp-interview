"use client"; // This is a client component 
import styles from "./page.module.css";
import 'reactflow/dist/style.css';

import { Alert, Button, ButtonGroup, Input } from "@mui/material";
import { useEffect, useState } from "react";
import ReactFlow from "reactflow";


export default function Home() {
  const [graph, setGraph] = useState<null|string[][]>(null);
  const [shortestPath, setShortestPath] = useState<string[] | null>(null);
  const [shortestDistance, setShortestDistance] = useState<number|null>(null);
  const [startNode, setStartNode] = useState<string|null>(null);
  const [endNode, setEndNode] = useState<string|null>(null);
  const [reactFlowNodes, setReactFlowNodes] = useState<any>(null);
  const [reactFlowEdges, setReactFlowEdges] = useState<any>(null);
  const [error, setError] = useState<string|null>(null);
  const onClick = () => {
    if (!graph) {
      console.error("Missing graph");
      setError("Missing graph");
      return;
    }
    if (!startNode || !endNode) {
      console.error("Missing start or end node");
      setError("Missing start or end node");
      return;
    }
    fetch("/api/graph", {
      method: "POST",
      body: JSON.stringify({ startNode: startNode, endNode: endNode, graph: graph }),
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
      
      const fromNodes = graph.map(([from, to, weight],index) => {
        return { id: from, position: { x: Math.random()*1000, y: Math.random()*1000 }, data: { label: from } };
      });
      const toNodes = graph.map(([from, to, weight],index) => {
        return { id: to, position: { x: Math.random()*1000, y: Math.random()*1000 }, data: { label: to } };
      })
      // merges the nodes but makes sure that there are no duplicates
      // @ts-ignore
      const nodes = [...new Set([...fromNodes, ...toNodes])];

      
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
                  });console.log(graph);
                  setGraph(graph);
                }
              };
              reader.readAsText(file);
            }
          } } />
        </Button>
        <Input type="text" placeholder="Start node" onChange={(e=> setStartNode(e.target.value))} style={{backgroundColor: 'Highlight', color: 'white'}}/>
        <Input type="text" placeholder="End node" onChange={(e=> setEndNode(e.target.value))} style={{backgroundColor: 'Highlight', color: 'white'}}/>
    
        <Button disabled={!graph}  onClick={onClick}>Find path</Button>
      </ButtonGroup>
      {!!error && (
        <Alert severity="error" style={{display: error ? 'block' : 'none'}}>{error}</Alert>
      )}
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
