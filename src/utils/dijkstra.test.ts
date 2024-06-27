import { describe, it, expect } from '@jest/globals'
import { dijkstra } from './dijkstra'

describe('Your Test Suite', () => {
  const exampleGraph = [
    ['A', 'B', '12'],
    ['A', 'C', '17'],
    ['A', 'D', '3'],
    ['B', 'D', '14'],
    ['B', 'E', '9'],
    ['C', 'F', '1'],
    ['D', 'F', '46'],
    ['D', 'G', '132'],
    ['F', 'G', '128'],
    ['F', 'H', '19'],
    ['G', 'I', '5'],
    ['G', 'J', '12'],
    ['H', 'I', '94'],
    ['H', 'K', '67'],
    ['I', 'J', '45'],
    ['I', 'K', '53'],
    ['I', 'L', '34'],
    ['J', 'L', '23'],
    ['K', 'L', '78'],
  ]
  it('should give the shortest path from A to L', () => {
    const { distance, path } = dijkstra(exampleGraph, 'A', 'L')
    expect(distance).toBe(165)
    expect(path).toEqual(['A', 'C', 'F', 'H', 'I', 'L'])
  })

  it('should give the shortest path from A to B', () => {
    const { distance, path } = dijkstra(exampleGraph, 'A', 'B')
    expect(distance).toBe(12)
    expect(path).toEqual(['A', 'B'])
  })
  it('should give error if path is not to be found', () => {
    const { distance, path, error } = dijkstra(exampleGraph, 'A', 'Q')
    expect(distance).toEqual(Infinity)
    expect(path).toEqual(null)
    expect(error).toBeDefined()
  })
})
