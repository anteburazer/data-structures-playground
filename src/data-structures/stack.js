class Stack {
    constructor() {
        this.input = [];
    }

    push(element) {
        this.input.push(element);
        return this;
    }

    pop() {
        return this.input.pop();
    }

    getElements() {
        return this.input;
    }
}

console.log('\n STACK \n--------------------------------------------------\n');

const stack = new Stack();

stack.push('a');
stack.push('b');
stack.push('c');

console.log('\n stack: ', stack.getElements());

stack.pop();
console.log('\n stack after c is removed: ', stack.getElements());
stack.pop();
console.log('\n stack after b is removed: ', stack.getElements());
stack.pop();
console.log('\n stack after a is removed: ', stack.getElements());