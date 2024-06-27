'use client' // This is a client component
import styles from './page.module.css'
import 'reactflow/dist/style.css'

import { Alert, Button, ButtonGroup, Input } from '@mui/material'
import { useEffect, useState } from 'react'
import ReactFlow from 'reactflow'
import backendService from '@/backendService'

export default function Home() {
  const [graph, setGraph] = useState<null | string[][]>(null)
  const [shortestPath, setShortestPath] = useState<string[] | null>(null)
  const [shortestDistance, setShortestDistance] = useState<number | null>(null)
  const [startNode, setStartNode] = useState<string | null>(null)
  const [endNode, setEndNode] = useState<string | null>(null)
  const [reactFlowNodes, setReactFlowNodes] = useState<any>(null)
  const [reactFlowEdges, setReactFlowEdges] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const onShortestPathClick = async () => {
    if (!graph || !startNode || !endNode) {
      setError('Missing graph, start or end node')
      return
    }
    const res = await backendService.getShortestPathDijkstra(
      startNode,
      endNode,
      graph,
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
    <main className={styles.main}>
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
          <Input
            type="text"
            placeholder="Start node"
            onChange={(e) => setStartNode(e.target.value)}
            style={{ backgroundColor: 'Highlight', color: 'white' }}
          />
          <Input
            type="text"
            placeholder="End node"
            onChange={(e) => setEndNode(e.target.value)}
            style={{ backgroundColor: 'Highlight', color: 'white' }}
          />

          <Button disabled={!graph} onClick={onShortestPathClick}>
            Find path
          </Button>
        </ButtonGroup>
        {!!error && (
          <Alert severity="error" style={{ display: error ? 'block' : 'none' }}>
            {error}
          </Alert>
        )}
        {reactFlowNodes && reactFlowEdges && (
          <div
            style={{
              width: '100%',
              height: '70vh',
              backgroundColor: 'white',
              borderRadius: '10px',
            }}
          >
            <ReactFlow nodes={reactFlowNodes} edges={reactFlowEdges} />
            <h2>Path: {shortestPath}</h2>
            <h3>Distance: {shortestDistance}</h3>
          </div>
        )}
      </div>
    </main>
  )
}
