class BackendService {
  public async getShortestPathDijkstra(
    startNode: string,
    endNode: string,
    graph: any,
  ) {
    const response = await fetch('/api/shortestPath', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startNode, endNode, graph }),
    })

    return response.json()
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new BackendService()
