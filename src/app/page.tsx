'use client' // This is a client component
import HelpIcon from '@mui/icons-material/Help';

import { Alert, Button, ButtonGroup, Input, Tooltip } from '@mui/material'
import GraphComponents from '@/components/Graph'
import { useStateManagement } from '@/stateManagement'
import styled from 'styled-components'
import backendService from '@/backendService'

export default function Home() {
  const {
    graphData,
    setGraphData,
    startNode,
    setStartNode,
    endNode,
    setEndNode,
    error,
    setError,
    shortestPath,
    setShortestPath,
    shortestDistance,
    setShortestDistance
  } = useStateManagement()

  // -------- functions
  const onNodeClick = (node: string) => {
    if (!startNode) {
      setStartNode(node)
      return
    }
    if (!endNode) {
      setEndNode(node)
      return
    }
    setEndNode(null)
    setStartNode(null)
  }

  const onShortestPathClick = async () => {
    if (!graphData || !startNode || !endNode) {
      setError('Missing graph, start or end node')
      return
    }
    const res = await backendService.getShortestPathDijkstra(
      startNode,
      endNode,
      graphData,
    )
    if (res.error) {
      setError(res.error)
      return
    }
    setShortestPath(res.path)
    setShortestDistance(res.distance)
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
        const loadedGraph = content
          .split('\n')
          .slice(1)
          .map((line) => {
            const [from, to, weight] = line.split(';')
            return [from, to, weight]
          })
        setGraphData(loadedGraph)
      }
    }
    reader.readAsText(file)
  }
  const onStartNodeChange = (node: string) => {
    setStartNode(node)
  }
  const onEndNodeChange = (node: string) => {
    setEndNode(node)
  }

  return (
    <MainContainer>
      <h1>Shortest path</h1>
      <p>
        Welcome to the shortest path website! to get started upload a csv file with the format of the graph data <Tooltip title="The format of the data is a semicolon seperated file in chunks of 3, where each list contains the start node, the end node and the weight of the edge example: From:To:Weight;A;B;5;A;C;15"><HelpIcon/></Tooltip>
      </p>
      {!!error && (
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}
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
        <InputContainer>
          <TextInput
            placeholder="Start"
            value={startNode}
            onChange={(e) => onStartNodeChange(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <TextInput
            placeholder="End"
            value={endNode}
            onChange={(e) => onEndNodeChange(e.target.value)}
          />
        </InputContainer>

        <ShortestPathButton
          onClick={onShortestPathClick}
          disabled={!startNode || !endNode || !graphData}
        >
          Find shortest path
        </ShortestPathButton>
      </ButtonGroup>
      {shortestPath && (
        <Alert severity="success">
          Shortest path is {shortestPath.join(' -> ')} with a distance of{' '} {shortestDistance}
        </Alert>
      
      )}
      {graphData && (
        <GraphComponents
          graphData={graphData}
          onNodeClick={onNodeClick}
          shortestPath={shortestPath}
          startNode={startNode}
          endNode={endNode}
        />
      )}
    </MainContainer>
  )
}

const MainContainer = styled.main`
  padding: 20px;
  border-radius: 10px;
  gap: 10px;
  display: flex;
  flex-direction: column;
`
const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 50px;
  background-color: white;
`

const TextInput = styled(Input)`
  input {
    text-align: center;
  }
`
const InputButtonGroup = styled(ButtonGroup)``

const ShortestPathButton = styled(Button)`
  height: 50px;
`
