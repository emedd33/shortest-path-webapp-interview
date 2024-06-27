'use client' // This is a client component

import { Alert, Button, ButtonGroup, Input } from '@mui/material'
import { useEffect, useState } from 'react'
import ReactFlow from 'reactflow'
import backendService from '@/backendService'
import GraphComponents from '@/components/Graph'

export default function Home() {
  const [graphData, setGraphData] = useState<null | string[][]>(null)

  const [shortestPath, setShortestPath] = useState<string[] | null>(null)
  const [shortestDistance, setShortestDistance] = useState<number | null>(null)
  const [startNode, setStartNode] = useState<string | null>(null)
  const [endNode, setEndNode] = useState<string | null>(null)
  const [reactFlowNodes, setReactFlowNodes] = useState<any>(null)
  const [reactFlowEdges, setReactFlowEdges] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const onShortestPathClick = async () => {
    if (!graphData || !startNode || !endNode) {
      setError('Missing graph, start or end node')
      return
    }
    const res = await backendService.getShortestPathDijkstra(
      startNode,
      endNode,
      graphData,
    )
  }
  const onFileUploaded = (file?: File) => {
    if (!file) {
      setError('Missing file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result
      if (typeof content === 'string') {
        const graph = content
          .split('\n')
          .slice(1)
          .map((line) => {
            const [from, to, weight] = line.split(';')
            return [from, to, weight]
          })
        setGraph(graph)
      }
    }
    reader.readAsText(file)
  }

  return (
    <main>
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr',
          justifyContent: 'center',
        }}
      >
        <h1>Shortest Path</h1>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0]
                onFileUploaded(file)
              }}
            />
          </Button>
        </ButtonGroup>
        <GraphComponents graphData={graphData} />
      </div>
    </main>
  )
}
