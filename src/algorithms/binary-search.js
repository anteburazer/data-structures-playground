function binarySearch(array, element) {
    let lowIndex = 0;
    let highIndex = array.length - 1;

    while (lowIndex <= highIndex) {
        const midIndex = Math.floor((lowIndex + highIndex) / 2);

        if (array[midIndex] === element) {
            return element;
        }

        if (element > array[midIndex]) {
            lowIndex = midIndex + 1;
        }

        if (element < array[midIndex]) {
            highIndex = midIndex - 1;
        }
    }

    return -1;
}


console.log('\n BINARY SEARCH \n--------------------------------------------------\n');

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log('\n Array: ', array);
console.log('\n Does 4 exists: ', binarySearch(array, 4) > 0);
console.log('\n Does 23 exists: ', binarySearch(array, 23) > 0);