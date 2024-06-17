import type { NextApiRequest, NextApiResponse } from 'next'
import { dijkstra } from '../../utils/dijkstra';
type ResponseData = {
  shortestPath: string[];
  distance: number;
}
type InputData = {
    startNode: string;
    endNode: string;
    graph: string[][]; 
    
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    console.log(req.body);
    if (req.method !== 'POST') {
        // Handle GET request
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }
    console.log('hei');
    const { startNode, endNode } = req.body as InputData;
    if (!startNode || !endNode) {
        res.status(400).end('Missing required fields');
        return;
    }
    const graph = [
        [ 'A', 'B', '12' ],  [ 'A', 'C', '17' ],
        [ 'A', 'D', '3' ],   [ 'B', 'D', '14' ],
        [ 'B', 'E', '9' ],   [ 'C', 'F', '1' ],
        [ 'D', 'F', '46' ],  [ 'D', 'G', '132' ],
        [ 'F', 'G', '128' ], [ 'F', 'H', '19' ],
        [ 'G', 'I', '5' ],   [ 'G', 'J', '12' ],
        [ 'H', 'I', '94' ],  [ 'H', 'K', '67' ],
        [ 'I', 'J', '45' ],  [ 'I', 'K', '53' ],
        [ 'I', 'L', '34' ],  [ 'J', 'L', '23' ],
        [ 'K', 'L', '78' ]
      ]
    try {
        const {path, distance} = dijkstra(graph, startNode, endNode);
        if (!path) {
            res.status(400).end('No path found');
            return;
        }
        res.status(200).json({ shortestPath: path, distance: distance});
    } catch (error) {
        console.error(error);
        res.status(500).end('Internal Server Error');
    }
  
}