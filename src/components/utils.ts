import { ShortestPathGraph } from '@/types'

/**
 * This function is used in src/components/graph.tsx in order to extract the nodes from the graphData
 * The format of the data is a list of lists, where each list contains the start node, the end node and the weight of the edge
 * example of a line ["A", "B", "5"]
 *
 * This function also checks if the nodes are leaf nodes
 * @param graphData
 * @returns nodes in the format of { id: string, size: number, isLeaf: boolean }
 * */
export const getGraphNodes = (
  graphData: ShortestPathGraph,
  startNode: string | null,
  endNode: string | null,
) => {
  const modifiedGraphData = graphData
    .map((nestedArray) => nestedArray.slice(0, -1))
    .flat()

  const uniqueNodes = Array.from(new Set(modifiedGraphData))
  return uniqueNodes.map((node) => {
    return {
      id: node,
      size: 30,
      isLeaf: !modifiedGraphData.includes(node),
      label: node,
      style: {
        fill:
          node === startNode
            ? '#5B8FF9'
            : node === endNode
              ? '#5AD8A6'
              : '#C6E5FF',
        lineWidth: 2,
      },
    }
  })
}

/**
 * This function is used in src/components/graph.tsx in order to extract the edges from the graphData
 * The format of the data is a list of lists, where each list contains the start node, the end node and the weight of the edge
 * example of a line ["A", "B", "5"]
 *
 * example of a shortestPath ["A", "B", "C"]
 * This function also checks if the nodes are leaf nodes
 * @param graphData
 * @returns edges
 * */
export const getGraphEdges = (
  graphData: ShortestPathGraph,
  shortestPath: string[] | null,
) => {
  const edges = graphData.map(([start, end, weight]) => {
    return {
      source: start,
      target: end,
      label: weight,
      style: { lineWidth: 1, stroke: '#000' },
    }
  })

  // now we color the edges that are in the shortest path
  shortestPath?.forEach((node, index) => {
    const edgeIndex = edges.findIndex(
      (edge) =>
        (edge.source === node && edge.target === shortestPath[index + 1]) ||
        (edge.source === shortestPath[index + 1] && edge.target === node),
    )
    if (edgeIndex !== -1) {
      edges[edgeIndex].style = {
        stroke: '#f00',
        lineWidth: 2,
      }
    }
  })
  return edges
}
