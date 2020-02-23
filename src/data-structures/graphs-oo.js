import { cloneDeep } from 'lodash';

/*
 * Graph representation using adjacency list with Object Oriented implementation
 * 
 * node = { value: 1, edges: [node2, node5] };
 */

class Node {
    constructor(value) {
        this.value = value;
        this.edges = []; // adjacency list
    }

    addEdge(node) {
        this.edges.push(node);
    }

    removeEdge(node) {
        const index = this.edges.indexOf(node);

        if (index > -1) {
            this.edges.splice(index, 1);
            return node;
        }
    }

    getEdges() {
        return this.edges;
    }

    isEdge(node) {
        return this.edges.indexOf(node) > -1;
    }
}

/*
 * const nodes = {
 *    1: [node2, node5],
 *    2: [node1, node5, node3, node4],
 *    3: [node2, node4],
 *    4: [node2, node5, node3],
 *    5: [node4, node1, node2]
 * }
 */
class Graph {
    constructor(edgeDirection = Graph.DIRECTED) {
        // key/value pairs, where the key is the node's value while the map value is the instance of the Node class
        this.nodes = new Map();
        this.edgeDirection = edgeDirection;
    }

    addNode(value) {
        if (this.nodes.has(value)) {
            return this.nodes.get(value);
        }

        const newNode = new Node(value);
        this.nodes.set(value, newNode);
        return newNode;
    }

    addNodesWithEdges(source, destination) {
        const sourceNode = this.addNode(source);
        const destinationNode = this.addNode(destination);

        sourceNode.addEdge(destinationNode);

        if (this.edgeDirection === Graph.UNDIRECTED) {
            destinationNode.addEdge(sourceNode);
        }

        return [sourceNode, destinationNode];
    }

    removeNode(value) {
        const nodeToRemove = this.nodes.get(value);

        if (nodeToRemove) {
            for (const node of this.nodes.values()) {
                node.removeEdge(nodeToRemove);
            }
        }
        
        return this.nodes.delete(value);
    }

    addEdge(sourceValue, destinationValue) {
        const sourceNode = this.addNode(sourceValue);
        const destinationNode = this.addNode(destinationValue);

        sourceNode.addEdge(destinationValue);

        if (this.edgeDirection === Graph.UNDIRECTED) {
            destinationNode.addEdge(sourceValue);
        }

        return [sourceNode, destinationNode];
    }

    removeEdge(sourceValue, destinationValue) {
        const sourceNode = this.nodes.get(sourceValue);
        const destinationNode = this.nodes.get(destinationValue);

        if (sourceNode && destinationNode) {
            sourceNode.removeEdge(destinationNode);

            if (this.edgeDirection === Graph.UNDIRECTED) {
                destinationNode.removeEdge(sourceNode);
            }            
        }

        return [sourceNode, destinationNode];
    }

    breadthFirstSearch(firstNode, callback) {
        const queue = [firstNode];
        const visitedNodes = [];

        while (queue.length) {
            const currentNode = queue.pop();

            if (!visitedNodes.includes(currentNode.value)) {
                callback(currentNode);
                visitedNodes.push(currentNode.value);
                currentNode.getEdges().forEach(node => {
                    queue.unshift(node);
                });
            }
        }

        // const visited = new Map();
        // const visitList = new Queue();

        // visitList.add(firstNode);

        // while(!visitList.isEmpty()) {
        //     const node = visitList.remove();

        //     if(node && !visited.has(node)) {
        //         callback(node);
        //         visited.set(node);
        //         node.getEdges().forEach(adj => {
        //             visitList.add(adj)
        //         });
        //     }
        // }
    }
}

console.log('\n GRAPHS - UNDIRECTED WITH OBJECT ORIENTED APPROACH \n--------------------------------------------------\n');

Graph.DIRECTED = Symbol('directed graph');
Graph.UNDIRECTED = Symbol('undirected graph');

const graph = new Graph(Graph.UNDIRECTED);

graph.addNodesWithEdges(1, 2);
graph.addNodesWithEdges(1, 5);
graph.addNodesWithEdges(2, 3);
graph.addNodesWithEdges(2, 4);
graph.addNodesWithEdges(2, 5);
graph.addNodesWithEdges(3, 4);
graph.addNodesWithEdges(4, 5);

// console.log('\n Graph with nodes and edges: ', graph);

// graph.removeNode(2);
// console.log('\n Graph after removing node2: ', cloneDeep(graph));

// graph.removeEdge(1, 5);
// console.log('\n Graph after removing the edge between node1 and node5: ', cloneDeep(graph));

graph.breadthFirstSearch(graph.nodes.get(1), node => console.log(node));
console.log('\n Graph with nodes and edges: ', graph);

export { Graph, Node };