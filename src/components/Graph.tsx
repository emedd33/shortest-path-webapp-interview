import { ShortestPathGraph } from '@/types'
import G6 from '@antv/g6'
import { useEffect, useRef } from 'react'

const GraphComponents = ({ graphData }: { graphData: ShortestPathGraph }) => {
  const graphRef = useRef<G6.Graph | null>(null)
  useEffect(() => {
    if (!document) return
    const width = document.getElementById('container')?.scrollWidth
    const height = document.getElementById('container')?.scrollHeight || 500

    if (!graphRef.current) {
      const graph = new G6.Graph({
        container: 'container',
        width,
        height,
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: (d) => {
            return 30
          },
          nodeStrength: (d) => {
            return -10
          },
          edgeStrength: (d) => {
            return 0.1
          },
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
      nodes: [
        { id: 'node0', size: 50 },
        { id: 'node1', size: 30 },
        { id: 'node2', size: 30 },
        { id: 'node3', size: 30 },
        { id: 'node4', size: 30, isLeaf: true },
        { id: 'node5', size: 30, isLeaf: true },
        { id: 'node6', size: 15, isLeaf: true },
        { id: 'node7', size: 15, isLeaf: true },
        { id: 'node8', size: 15, isLeaf: true },
        { id: 'node9', size: 15, isLeaf: true },
        { id: 'node10', size: 15, isLeaf: true },
        { id: 'node11', size: 15, isLeaf: true },
        { id: 'node12', size: 15, isLeaf: true },
        { id: 'node13', size: 15, isLeaf: true },
        { id: 'node14', size: 15, isLeaf: true },
      ],
      edges: [
        { source: 'node0', target: 'node1' },
        { source: 'node0', target: 'node2' },
        { source: 'node0', target: 'node3' },
        { source: 'node0', target: 'node4' },
        { source: 'node0', target: 'node5' },
        { source: 'node1', target: 'node6' },
        { source: 'node1', target: 'node7' },
        { source: 'node2', target: 'node8' },
        { source: 'node2', target: 'node9' },
        { source: 'node2', target: 'node10' },
        { source: 'node2', target: 'node11' },
        { source: 'node2', target: 'node12' },
        { source: 'node2', target: 'node13' },
        { source: 'node3', target: 'node14' },
        { source: 'node3', target: 'node15' },
        { source: 'node3', target: 'node16' },
      ],
    }
    const nodes = data.nodes
    graphRef.current.data({
      nodes,
      edges: data.edges.map(function (edge, i) {
        edge.id = 'edge' + i
        return Object.assign({}, edge)
      }),
    })
    graphRef.current.render()

    graphRef.current.on('node:dragstart', function (e) {
      graphRef.current.layout()
      refreshDragedNodePosition(e)
    })
    graphRef.current.on('node:drag', function (e) {
      refreshDragedNodePosition(e)
    })
    graphRef.current.on('node:dragend', function (e) {
      e.item.get('model').fx = null
      e.item.get('model').fy = null
    })

    function refreshDragedNodePosition(e) {
      const model = e.item.get('model')
      model.fx = e.x
      model.fy = e.y
    }
  }, [graphData])
  return <div id="container"></div>
}

export default GraphComponents
