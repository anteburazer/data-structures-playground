import { cloneDeep } from 'lodash';

/*
 * Graph representation using adjacency list with HashMap implementation
 * This is Unidirected graph
 *
 * const adjList = {
 *    1: [node2, node5],
 *    2: [node1, node5, node3, node4],
 *    3: [node2, node4],
 *    4: [node2, node5, node3],
 *    5: [node4, node1, node2]
 * }
 * 
 * node1 = { node, edges: [2, 5] };
 * 
 * const node = { value: 1 };
 */ 

class Graph {
    constructor() {
        // this.nodes = [];
        this.adjList = {};
    }

    addNode(node) {
        // Duplicates will rewrite the current node
        // this.nodes.push(node);
        this.adjList[node.value] = {
            node: node,
            edges: []
        };
    }

    addEdge(node1, node2) {
        this.adjList[node1.value].edges.push(node2.value);
        this.adjList[node2.value].edges.push(node1.value);
    }

    removeNode(node) {
        delete this.adjList[node.value];
        const nodeKeys = Object.keys(this.adjList);

        nodeKeys.forEach(currentNodeKey => {
            const currentNode = this.adjList[currentNodeKey];
            const index = currentNode.edges.indexOf(node.value);

            if (index > -1) {
                currentNode.edges.splice(index, 1);
            }
        });
    }

    removeEdge(node1, node2) {
        this._removeNodeEdge(node1, node2);
        this._removeNodeEdge(node2, node1);
    }

    _removeNodeEdge(node1, node2) {
        const node1Edges = this.adjList[node1.value].edges;
        const indexOfNode2 = node1Edges.indexOf(node2.value);

        if (indexOfNode2 > -1) {
            node1Edges.splice(indexOfNode2, 1);
        }
    }

    depthFirstTraversal(startingNode, func = console.log) {
    }

    breadthFirstTraversal(startingNode, func = console.log) {
    }
}

console.log('\n GRAPHS - UNIDIRECTED WITH HASH MAP \n--------------------------------------------------\n');

const graph = new Graph();

const node1 = { value: 1 };
const node2 = { value: 2 };
const node3 = { value: 3 };
const node4 = { value: 4 };
const node5 = { value: 5 };

graph.addNode(node1);
graph.addNode(node2);
graph.addNode(node3);
graph.addNode(node4);
graph.addNode(node5);

graph.addEdge(node1, node2);
graph.addEdge(node1, node5);

graph.addEdge(node2, node5);
graph.addEdge(node2, node3);
graph.addEdge(node2, node4);

graph.addEdge(node3, node4);

graph.addEdge(node4, node5);

console.log('\n Graph with nodes and edges: ', graph);

graph.removeNode(node2);
console.log('\n Graph after removing node2: ', cloneDeep(graph));

graph.removeEdge(node1, node5);
console.log('\n Graph after removing the edge between node1 and node5: ', cloneDeep(graph));

export default Graph;