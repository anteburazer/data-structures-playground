class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    addFirst(value) {
        const node = new Node(value);

        node.next = this.root;
        this.root = node;
        this.size += 1;
    }

    addLast(value) {
        const node = new Node(value);
        
        if (this.root) {
            let currentNode = this.root;

            while (currentNode && currentNode.next) {
                currentNode = currentNode.next;
            }

            currentNode.next = node;
        } else {
            this.root = node;
        }

        this.size += 1;
    }

    removeFirst() {
        if (this.root) {
            this.root = this.root.next;
            this.size -= 1;
        }
    }

    removeLast() {
        if (this.root) {
            let currentNode = this.root;

            if (!currentNode.next) {
                this.root = null;
            }

            while (currentNode.next && currentNode.next.next) {
                currentNode = currentNode.next;
            }

            currentNode.next = null;
            this.size -= 1;
        }
    }

    remove(index = 0) {
        if (index === 0) {
            this.removeFirst();
            return;
        }

        let currentNode = this.root;
        let currentIndex = 1;

        while (currentNode && currentNode.next) {
            if (index == currentIndex) {
                currentNode.next = currentNode.next.next;
                this.size -= 1;
                break;
            }

            currentNode = currentNode.next;
            currentIndex += 1;
        }
    }

    contains(value) {
        let currentNode = this.root;

        while (currentNode && currentNode.next) {
            if (currentNode.value === value) {
                return true;
            }

            currentNode = currentNode.next;
        }

        return currentNode.value === value ? true : false;

        return false;
    }
}

console.log('\n SINGLE LINKED LIST \n--------------------------------------------------\n');

const linkedList = new LinkedList();

linkedList.addFirst('1');
linkedList.addLast('2');
linkedList.addLast('3');
linkedList.addLast('4');

// linkedList.removeFirst();
// linkedList.remove(3);
const contains5 = linkedList.contains('5');
console.log('\n Linked list contains 5: ', contains5);

const contains3 = linkedList.contains('3');
console.log('\n Linked list contains 3: ', contains3);

console.log('\n Linked list: ', linkedList);