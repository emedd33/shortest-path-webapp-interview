import {
  StartNode,
  EndNode,
  ShortestPathGraph,
  Distance,
  ShortestPath,
} from '@/types'
import { dijkstra } from '@/utils/dijkstra'

type RequestBody = {
  startNode: StartNode
  endNode: EndNode
  graph: ShortestPathGraph
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json()
  const { startNode, endNode, graph } = body
  if (!graph) {
    return new Response('Missing Graph', { status: 400 })
  }
  if (!startNode || !endNode) {
    return new Response('Missing start or end node', { status: 400 })
  }
  const { path, distance, error } = dijkstra(graph, startNode, endNode)

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 })
  }

  return new Response(JSON.stringify({ path, distance, error }), {
    status: 200,
  })
}
