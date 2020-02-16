import { cloneDeep } from 'lodash';

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    /*
     * 1) If a tree is empty, the first node becomes the root and we are done.
     * 2) Compare root/parent’s value if it’s higher go right, if it’s lower go left.
     */
    insert(value) {
        if (!this.root) {
            this.root = new Node(value);
            this.size++;
            return this.root;
        }

        const goThrough = (parent, value) => {
            if (value < parent.value) {
                if (parent.left) {
                    goThrough(parent.left, value);
                } else {
                    parent.left = new Node(value);
                    this.size++;
                    return parent.left;
                }
            } else if (value > parent.value) {
                if (parent.right) {
                    goThrough(parent.right, value);
                } else {
                    parent.right = new Node(value);
                    this.size++;
                    return parent.right;
                }
            }
        };

        return goThrough(this.root, value);
    }

    contains(value) {
        if (!this.root) {
            return false;
        }
        
        if (this.root.value === value) {
            return true;
        }

        const goThrough = (parent, value) => {
            if (parent.value === value) {
                return true;
            }

            const leftContainsValue = parent.left && goThrough(parent.left, value) ? true : false;
            const rightContainsValue = parent.right && goThrough(parent.right, value) ? true : false;

            return leftContainsValue || rightContainsValue;
        };

        return goThrough(this.root, value);
    }

    min(node) {
        if (!node) {
            return;
        }

        if (!node.left) {
            return node;
        }

        return this.min(node.left);
    }

    max(node) {
        if (!node) {
            return;
        }

        if (!node.right) {
            return node;
        }

        return this.max(node.right);
    }

    /*
     * 1) DELETING A LEAF NODE (0 CHILDREN)
     *    We just remove the reference from node’s parent (15) to be null.
     *
     *       30                             30
     *     /    \        remove(12)       /    \
     *   10      40      --------->     10      40
     *     \    /  \                      \    /  \
     *     15  35   50                    15  35   50
     *    /
     *   12*
     *
     * 
     * 2) DELETING A NODE WITH ONE CHILD
     *    we go to the parent (30) and replace the child (10), with a child’s child (15).
     *
     *       30                             30
     *     /    \        remove(10)       /    \
     *   10*     40      --------->     15      40
     *     \    /  \                           /  \
     *     15  35   50                        35   50
     * 
     * 
     * 3) DELETING A NODE WITH TWO CHILDREN
     *    We replace the parent’s (30) child (40) with the child’s right child (50).
     *    Then we keep the left child (35) in the same place it was before, so we have to make it the left child of 50.
     *
     *       30                             30
     *     /    \        remove(40)       /    \
     *   15      40*     --------->     15      50
     *          /  \                           /  
     *         35   50                        35   
     * 
     *    Another way to do it to remove node 40, is to move the left child (35) up and then keep the right child (50) where it was.
     * 
     *       30
     *     /    \
     *   15      35
     *             \
     *              50
     * 
     * 
     * 4) DELETING TEH ROOT
     *    Deleting the root is very similar to removing nodes with 0, 1, or 2 children that we discussed earlier. 
     *    The only difference is that afterward, we need to update the reference of the root of the tree.
     * 
     *       30*                           50
     *     /    \       remove(30)       /    \
     *   15      50     --------->     15      35
     *          /  
     *         35
     */
    remove(value) {
        const goThrough = (node, value) => {
            if (node.value === value) {
                // 1) No children, remove the current node
                if (!node.left && !node.right) {
                    node = null;
                    this.size--;
                    return node;
                }

                // 2) One child
                if (!node.left) {
                    node = node.right;
                    this.size--;
                    return node
                }

                if (!node.right) {
                    node = node.left;
                    this.size--;
                    return node
                }

                // 3) Two children
                let successor = this.min(node.right);
                let temp = node.value;
                node.value = successor.value;
                successor.value = temp;
                node.right = goThrough(node.right, temp);
                return node;
            }

            if (value < node.value && node.left) {
                node.left = goThrough(node.left, value);
            }

            if (value > node.value && node.right) {
                node.right = goThrough(node.right, value);
            }

            return node;
        };

        this.root = goThrough(this.root, value);
    }

    // left, root, right
    inOrderTraversal(node, callback) {
        if (!node) {
            return false;
        }

        if (node.left) {
            this.inOrderTraversal(node. left, callback);
        }

        callback(node);

        if (node.right) {
            this.inOrderTraversal(node.right, callback);
        }
    }

    // root, left, right
    preOrderTraversal(node, callback) {
        if (!node) {
            return false;
        }

        callback(node);
        
        if (node.left) {
            this.preOrderTraversal(node.left, callback);
        }

        if (node.right) {
            this.preOrderTraversal(node.right, callback);
        }
    }

    // left, right, root
    postOrderTraversal(node, callback) {
        if (!node) {
            return false;
        }
        
        if (node.left) {
            this.postOrderTraversal(node.left, callback);
        }

        if (node.right) {
            this.postOrderTraversal(node.right, callback);
        }

        callback(node);
    }
}

console.log('\n TREES - BINARY SEARCH TREE \n--------------------------------------------------\n');

const bst = new BinarySearchTree();

bst.insert(30);
bst.insert(10);
bst.insert(40);
bst.insert(35);
bst.insert(50);
bst.insert(15);
bst.insert(12);

console.log('\n Binary search tree: ', cloneDeep(bst));

console.log('\n Pre-order traversal');
bst.preOrderTraversal(bst.root, node => console.log(node.value));

console.log('\n In-order traversal');
bst.inOrderTraversal(bst.root, node => console.log(node.value));

console.log('\n Post-order traversal');
bst.postOrderTraversal(bst.root, node => console.log(node.value));

console.log('\n Contains 30:', bst.contains(30), ' Contains 12:', bst.contains(12), ' Contains 8:', bst.contains(8));

console.log('\n Minimum node: ', bst.min(bst.root));
console.log('\n Maximum node: ', bst.max(bst.root));

bst.remove(30);
console.log('\n Removed 30. Tree:', cloneDeep(bst));

export { BinarySearchTree, Node };