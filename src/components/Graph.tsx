import { ShortestPathGraph } from '@/types'
import { useEffect, useRef } from 'react'
import { getGraphEdges, getGraphNodes } from './utils'
import styled from 'styled-components'
import { Graph } from '@antv/g6'

const GraphComponents = ({
  graphData,
  startNode,
  endNode,
  shortestPath,
}: {
  graphData?: ShortestPathGraph | null
  onNodeClick?: (node: string) => void
  startNode: string | null
  endNode: string | null
  shortestPath: string[] | null
}) => {
  const graphRef = useRef<Graph | null>(null)
  useEffect(() => {
    if (!document) return
    if (!graphData) return
    const graphNodes = getGraphNodes(graphData, startNode, endNode)
    const graphEdges = getGraphEdges(graphData, shortestPath)

    if (!graphRef.current) {
      const graph = new Graph({
        container: 'container',
        width: 1080,
        height: 920,
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: 20,
          nodeStrength: -100,
          edgeStrength: 0.05,
        },
        modes: {
          default: ['drag-node'],
        },
        defaultNode: {
          color: '#5B8FF9',
          style: {
            lineWidth: 2,
            fill: '#C6E5FF',
          },
        },
        defaultEdge: {
          size: 1,
          color: '#e2e2e2',
        },
      })
      graphRef.current = graph
    }
    const data = {
      nodes: graphNodes,
      edges: graphEdges,
    }

    const nodes = data.nodes
    const edges = data.edges
    graphRef.current.data({
      nodes,
      edges,
    })
    graphRef.current.render()

    graphRef.current.on('node:dragstart', function (e: any) {
      if (!graphRef.current) return
      graphRef.current.layout()
      refreshDragedNodePosition(e)
    })
    graphRef.current.on('node:drag', function (e: any) {
      refreshDragedNodePosition(e)
    })
    graphRef.current.on('node:dragend', function (e: any) {
      e.item.get('model').fx = null
      e.item.get('model').fy = null
    })

    function refreshDragedNodePosition(e: any) {
      const model = e.item.get('model')
      model.fx = e.x
      model.fy = e.y
    }
  }, [graphData, startNode, endNode, shortestPath])
  return <Container id="container" />
}

export default GraphComponents

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  overflow: auto;
  background-color: white;
`
