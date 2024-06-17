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
    const { startNode, endNode, graph } = req.body as InputData;
    if (!startNode || !endNode) {
        res.status(400).end('Missing required fields');
        return;
    }
   
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