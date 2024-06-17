
// Helper function to create an adjacency list from the graph
// this function is used to create a map of the graph so we can easily access the nodes and their weights
function createAdjacencyList(graph: string[][]) {
    const adjacencyList: Map<string, { node: string, weight: number }[]> = new Map();
    
    graph.forEach(([start, end, weightString]) => {
      if (!adjacencyList.has(start)) {
        adjacencyList.set(start, []);
      }
      if (!adjacencyList.has(end)) {
        adjacencyList.set(end, []);
      }
      // over the api we get the weights as strings, so we need to parse them to integers
      const weight = parseInt(weightString);
      adjacencyList?.get(start)?.push({ node: end, weight });
      adjacencyList?.get(end)?.push({ node: start, weight }); // If the graph is undirected
    });
    
    return adjacencyList;
  }
  
  // Helper function to find the node with the smallest distance
  // @ts-ignore
  function getMinDistanceNode(distances, visited) {
    let minDistance = Infinity;
    let minNode = null;
    
    distances.forEach((distance:number, node: string) => {
      if (!visited.has(node) && distance < minDistance) {
        minDistance = distance;
        minNode = node;
      }
    });
    
    return minNode;
  }
  
  // Dijkstra's algorithm
  function dijkstra(graph: string[][], startNode:string, endNode: string) {

    // initialiserer variabler
    const adjacencyList = createAdjacencyList(graph);
    const distances = new Map();
    const previousNodes = new Map();
    const visited = new Set();
    
    // Initialize distances
    distances.set(startNode, 0);
    adjacencyList.forEach((_, node) => {
      if (node !== startNode) {
        distances.set(node, Infinity);
      }
      previousNodes.set(node, null);
    });
    
    let currentNode = getMinDistanceNode(distances, visited);
    
    while (currentNode) {
    // there is where the magic happens
      visited.add(currentNode);
      
      if (currentNode === endNode) {
        // Build the shortest path by backtracking through previousNodes
        const path = [];
        let current = endNode;
        while (current !== null) {
            // We add the current node to the path
          // @ts-ignore
          path.unshift(current);
          current = previousNodes.get(current);
        }
        return { distance: distances.get(endNode), path };
      }

      const neighbors = adjacencyList.get(currentNode);
      if (!neighbors) {
        break;
      }

      for (const { node: neighbor, weight } of neighbors) {
        const newDistance = distances.get(currentNode) + weight;
        if (newDistance < distances.get(neighbor)) {
          distances.set(neighbor, newDistance);
          previousNodes.set(neighbor, currentNode);
        }
      }
      
      currentNode = getMinDistanceNode(distances, visited);
    }
    
    return { distance: Infinity, path: null }; // Return if there is no path
  }
  export { dijkstra };