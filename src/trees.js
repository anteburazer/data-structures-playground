class Tree {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    /*
     * Depth-First (Pre-order) Traversal -> root, left, right
     *
     * Iterates over each node and calls a callback function for each of them
     */
    static traverse(tree, callback) {
        callback(tree);
        tree.children.forEach(node => {
            Tree.traverse(node, callback);
        });
    }

    /*
     * Returns true if it finds the node by a given value
     */
    contains(searchValue) {
        return Tree.find(this, searchValue) ? true : false;
    }

    /*
     * Returns total number of all nodes in the tree, including the root
     */
    static size(tree) {
        let size = 0;

        Tree.traverse(tree, node => {
            size++;
        });

        return size;
    }

    /*
     * Returns node by a given value
     */
    static find(tree, value) {
        let result;

        Tree.traverse(tree, node => {
            if (value === node.value) {
                result = node;
            }
        });

        return result;
    }

    /*
     * Creates new node for given parent with given value
     */
    insert(parentTree, value) {
        const newNode = Tree.find(parentTree, parentTree.value);

        if (newNode) {
            newNode.insertChild(value);
        }

        return newNode;
    }

    /*
     * Creates new node with given value
     */
    insertChild(value) {
        const newTree = new Tree(value);
        this.children.push(newTree);
        return newTree;
    }

    remove(value) {
        // 1. approach
        this.children.forEach((child, index) => {
            if (child.value === value) {
                this.children.splice(index, 1);
            } else {
                child.remove(value);
            }
        });

        // 2. approach
        // Tree.traverse(this, node => {
        //     node.children.forEach((child, index) => {
        //         if (child.value === value) {
        //             node.children.splice(index, 1);
        //         }
        //     });
        // });
    }

    replaceValues(value1, value2) {
        const node1 = Tree.find(this, value1);
        const node2 = Tree.find(this, value2);

        node1.value = value2;
        node2.value = value1;
    }
}
console.log('\n TREES - BASIC CONCENT \n--------------------------------------------------\n');

const Smiths = new Tree('Smiths');
const Mike = Smiths.insertChild('Mike');
const Mia = Smiths.insertChild('Mia');
const Sara = Smiths.insertChild('Sara');
const Luke = Mike.insertChild('Luke');

console.log('Traversing');
Tree.traverse(Smiths, child => console.log(child));

console.log('\n Size of Smiths tree before deleting Mia:', Tree.size(Smiths));

console.log('Deleting Mia');
Smiths.remove('Mia');

console.log('Size of Smiths tree after deleting Mia:', Tree.size(Smiths));

console.log('\n Traversing');
Tree.traverse(Smiths, child => console.log(child));

console.log('\n Inserting into Sara');
Smiths.insert(Sara, 'Dora');

console.log('Size of Smiths tree after inserting Dora into Sara:', Tree.size(Smiths));

console.log('\n Traversing');
Tree.traverse(Smiths, child => console.log(child));

const containsDora = Smiths.contains('Dora');
const containsToma = Smiths.contains('Toma');
console.log('\n Does Smiths contain Dora:', containsDora);
console.log('Does Smiths contain Toma:', containsToma);

export default Tree;