class Queue {
    constructor() {
        this.input = [];
    }

    push(element) {
        // this.input.push(element);
        this.input.unshift(element);
        return this;
    }

    pop() {
        // return this.input.shift();
        return this.input.pop();
    }

    getElements() {
        return this.input;
    }
}

console.log('\n QUEUE \n--------------------------------------------------\n');

const queue = new Queue();

queue.push('a');
queue.push('b');
queue.push('c');

console.log('\n queue: ', queue.getElements());

queue.pop();
console.log('\n queue after c is removed: ', queue.getElements());
queue.pop();
console.log('\n queue after b is removed: ', queue.getElements());
queue.pop();
console.log('\n queue after a is removed: ', queue.getElements());