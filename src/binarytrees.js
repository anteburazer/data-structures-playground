class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    } 

    insertChild(value) {
        const newChild = new BinaryTree(value);
        const queue = [this];
        let childInserted = false;

        while (queue.length && !childInserted) {
            const currentNode = queue.shift();
            
            if (!currentNode.left) {
                currentNode.left = newChild;
                childInserted = true;
            } else if (!currentNode.right) {
                currentNode.right = newChild;
                childInserted = true;
            } else {
                queue.push(currentNode.left);
                queue.push(currentNode.right);
            }
        }

        return newChild;
    }

    contains(value) {
        if (this.value === value) {
            return true;
        }

        const leftContainsValue = this.left && this.left.contains(value) ? true : false;
        const rightContainsValue = this.right && this.right.contains(value) ? true : false;

        return leftContainsValue || rightContainsValue;
    }

    // left, root, right
    inOrderTraversal(callback) {
        if (this.left) {
            this.left.inOrderTraversal(callback);
        }

        callback(this);

        if (this.right) {
            this.right.inOrderTraversal(callback);
        }
    } 

    // root, left, right
    preOrderTraversal(callback) {
        callback(this);

        if (this.left) {
            this.left.preOrderTraversal(callback);
        }

        if (this.right) {
            this.right.preOrderTraversal(callback);
        }
    } 

    // left, right, root
    postOrderTraversal(callback) {
        if (this.left) {
            this.left.postOrderTraversal(callback);
        }

        if (this.right) {
            this.right.postOrderTraversal(callback);
        }

        callback(this);
    }
}
console.log('\n TREES - BINARY TREE \n\n');

const binaryTree = new BinaryTree(1);

binaryTree.insertChild(2);
binaryTree.insertChild(3);
binaryTree.insertChild(4);
binaryTree.insertChild(5);
binaryTree.insertChild(6);

console.log('\n Binary tree: ', binaryTree);

console.log('\n Pre-order traversal');
binaryTree.preOrderTraversal(node => console.log(node.value));

console.log('\n In-order traversal');
binaryTree.inOrderTraversal(node => console.log(node.value));

console.log('\n Post-order traversal');
binaryTree.postOrderTraversal(node => console.log(node.value));

console.log('\n Tree contains 3: ', binaryTree.contains(3));
console.log('\n Tree contains 5: ', binaryTree.contains(5));
console.log('\n Tree contains 7: ', binaryTree.contains(7));

export default BinaryTree;