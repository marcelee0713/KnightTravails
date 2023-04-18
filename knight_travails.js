class Board {
  constructor(size) {
    this.size = size;
    this.grid = new Array(size);
    for (let i = 0; i < size; i++) {
      this.grid[i] = new Array(size);
      for (let j = 0; j < size; j++) {
        this.grid[i][j] = new Node(i, j);
      }
    }
  }

  getNode(x, y) {
    return this.grid[x][y];
  }
}

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.neighbors = [];
    this.visited = false;
    this.distance = Infinity;
    this.parent = null;
  }

  addNeighbor(node) {
    this.neighbors.push(node);
  }

  getNeighbors() {
    return this.neighbors;
  }
}

function generateBoard(size) {
  const board = new Board(size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const node = board.getNode(i, j);
      const moves = getValidMoves(i, j, size);
      for (const move of moves) {
        const neighbor = board.getNode(move[0], move[1]);
        node.addNeighbor(neighbor);
      }
    }
  }
  return board;
}

function getValidMoves(x, y, size) {
  const moves = [
    [x - 2, y - 1],
    [x - 2, y + 1],
    [x - 1, y - 2],
    [x - 1, y + 2],
    [x + 1, y - 2],
    [x + 1, y + 2],
    [x + 2, y - 1],
    [x + 2, y + 1],
  ];
  return moves.filter((move) => isValid(move[0], move[1], size));
}

function isValid(x, y, size) {
  return x >= 0 && x < size && y >= 0 && y < size;
}

function findShortestPath(startX, startY, endX, endY, board) {
  const startNode = board.getNode(startX, startY);
  const endNode = board.getNode(endX, endY);

  startNode.distance = 0;
  startNode.visited = true;

  const queue = [startNode];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    const neighbors = currentNode.getNeighbors();
    console.log(neighbors);

    for (const neighbor of neighbors) {
      if (!neighbor.visited) {
        neighbor.visited = true;
        neighbor.distance = currentNode.distance + 1;
        neighbor.parent = currentNode;
        queue.push(neighbor);
      }
    }
  }

  const path = [];
  let current = endNode;

  while (current !== startNode) {
    path.unshift([current.x, current.y]);
    current = current.parent;
  }

  path.unshift([startNode.x, startNode.y]);

  return path;
}

const boardSize = 8;
const board = generateBoard(boardSize);

const startX = 2;
const startY = 2;
const endX = 6;
const endY = 6;

const shortestPath = findShortestPath(startX, startY, endX, endY, board);

console.log(`Shortest path from (${startX}, ${startY}) to (${endX}, ${endY}):`);
console.log(shortestPath);
