"use client"; // This is a client component 
import styles from "./page.module.css";
import { Button, ButtonGroup, Input } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [graph, setGraph] = useState<null|string[][]>(null);
  const [shortestPath, setShortestPath] = useState<string[] | null>(null);
  const [shortestDistance, setShortestDistance] = useState<number|null>(null);

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
  console.log(graph);
  
  
  return (
    <main className={styles.main}>
      <div>

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
        </div>
    </main>
  );
}
