class Node {
  constructor(value) {
    this.value = value;
    this.neighbors = [];
    this.visited = false;
  }
}

function bfs(node) {
  if (node === null) {
    return null;
  }

  let queue = [];
  let array = [];
  node.visited = true;
  queue.push(node);
  array.push(node.value);

  while (queue !== null || !queue.length) {
    const currentNode = queue.shift();
    if (!currentNode) {
      return array;
    }
    for (let i = 0; i < currentNode.neighbors.length; i++) {
      const neighborsNodes = currentNode.neighbors[i];
      if (!neighborsNodes.visited) {
        neighborsNodes.visited = true;
        queue.push(neighborsNodes);
        array.push(neighborsNodes.value);
      }
    }
  }
}

function dfs(node, arr = []) {
  if (!node) {
    return null;
  }
  node.visited = true;
  arr.push(node.value);
  node.neighbors.forEach((neighbors) => {
    if (!neighbors.visited) {
      dfs(neighbors, arr);
    }
  });
  return arr;
}

function shortestPath(start, end) {
  if (start === null || end === null) {
    return;
  }
  start.visited = true;
  const queue = [start];
  const parent = new Map();
  parent.set(start, null);

  while (queue !== null || !queue.length) {
    const currentNode = queue.shift();

    if (currentNode === end) {
      // Btw also return the path and counts
      let path = [];
      let node = currentNode;
      while (node !== null) {
        path.unshift(node.value);
        node = parent.get(node);
      }

      return path.join(" => ");
    }

    currentNode.neighbors.forEach((neighbors) => {
      const neighborNode = neighbors;
      if (!parent.has(neighborNode)) {
        parent.set(neighborNode, currentNode);
        queue.push(neighborNode);
      }
    });
  }
}

const node02 = new Node(2);
const node05 = new Node(5);
const node08 = new Node(8);
const node09 = new Node(9);
const node11 = new Node(11);
const node20 = new Node(20);
const node22 = new Node(22);
const node30 = new Node(30);
const node40 = new Node(40);
node02.neighbors.push(node08, node05, node11);
node05.neighbors.push(node02, node08, node09);
node08.neighbors.push(node02, node05, node09, node11);
node09.neighbors.push(node05, node08);
node11.neighbors.push(node02, node08, node20);
node20.neighbors.push(node11, node22);
node22.neighbors.push(node20, node30);
node30.neighbors.push(node22);

const graph = [node02, node05, node08, node09, node11];

console.log(bfs(node02));
//console.log(dfs(node02));
//console.log(shortestPath(node02, node20));
