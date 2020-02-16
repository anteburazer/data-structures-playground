class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    addFirst(value) {
        const node = new Node(value);
        const currentHead = this.head;

        this.head = node;

        if (currentHead) {
            this.head.next = currentHead;
            currentHead.previous = this.head;
        } else {
            this.tail = node;
        }

        this.size += 1;
    }

    addLast(value) {
        const node = new Node(value);
        
        if (this.head) {
            let currentNode = this.head;

            while (currentNode && currentNode.next) {
                currentNode = currentNode.next;
            }

            // currentNode is the last node in the list
            node.previous = currentNode;
            currentNode.next = node;
        } else {
            this.head = node;
        }

        this.tail = node;
        this.size += 1;
    }

    removeFirst() {
        if (this.head) {
            if (this.head.next) {
                this.head = this.head.next;
                this.head.previous = null;                
            } else {
                this.head = null;
                this.tail = null;
            }
            
            this.size -= 1;
        }
    }

    removeLast() {
        if (this.head) {
            // There's only one node in the list
            if (!this.head.next) {
                this.head = null;
                this.tail = null;
                this.size -= 1;
                return;
            }

            let currentNode = this.head;

            while (currentNode.next && currentNode.next.next) {
                currentNode = currentNode.next;
            }

            // currentNode is the penultimate node in the list
            currentNode.next = null;
            this.tail = currentNode;
            this.size -= 1;
        }
    }

    add(value, index) {
        if (index === 0) {
            return this.addFirst(value);
        }

        for (let current = this.head, i = 0; i <= this.size; i++, current = current && current.next ) {
            if (index === i) {
                if (i === this.size) {
                    return this.addLast(value);
                }

                const newNode = new Node(value);
                newNode.next = current;
                newNode.previous = current.previous;

                current.previous.next = newNode;
                current.previous = newNode;

                this.size += 1;
                return newNode;
            }
        }
    }

    remove(index = 0) {
        if (index === 0) {
            return this.removeFirst();
        }

        for (let current = this.head, i = 0; i <= this.size; i++, current = current && current.next ) {
            if (index === i) {
                if (i === this.size - 1) {
                    return this.removeLast();
                }

                current.previous.next = current.next;
                current.next.previous = current.previous;
                this.size -= 1;
                return;
            }
        }
    }

    contains(value) {
        let currentNode = this.head;

        while (currentNode && currentNode.next) {
            if (currentNode.value === value) {
                return true;
            }

            currentNode = currentNode.next;
        }

        return currentNode.value === value ? true : false;
    }
}

console.log('\n DOUBLE LINKED LIST \n--------------------------------------------------\n');

const linkedList = new LinkedList();

// linkedList.addFirst('3');
// linkedList.addFirst('2');
linkedList.addFirst('1');
linkedList.addLast('2');
linkedList.addLast('3');

// linkedList.removeLast();
// linkedList.removeLast();
// linkedList.add('0', 0);
linkedList.remove(1);
const contains5 = linkedList.contains('5');
console.log('\n Linked list contains 5: ', contains5);

const contains3 = linkedList.contains('3');
console.log('\n Linked list contains 3: ', contains3);

console.log('\n Linked list: ', linkedList);