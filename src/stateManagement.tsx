'use client'
import { useState } from 'react'
import { ShortestPathGraph } from './types'

export const useStateManagement = () => {
  const [graphData, setGraphData] = useState<null | ShortestPathGraph>(null)
  const [shortestPath, setShortestPath] = useState<string[] | null>(null)
  const [shortestDistance, setShortestDistance] = useState<number | null>(null)
  const [startNode, setStartNode] = useState<string | null>(null)
  const [endNode, setEndNode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  return {
    graphData,
    setGraphData,
    shortestPath,
    setShortestPath,
    shortestDistance,
    setShortestDistance,
    startNode,
    setStartNode,
    endNode,
    setEndNode,
    error,
    setError,
  }
}
