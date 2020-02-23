import { cloneDeep } from 'lodash';

function bubbleSort(array) {
    const length = array.length;

    for (let i = 0; i <= length; i++) {
        for (let j = i + 1; j <= length; j++) {
            if (array[j] < array[i]) {
                swap(array, i, j);
            }
        }
    }
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

console.log('\n BUBBLE SORT \n--------------------------------------------------\n');

const array = [72, 54, 59, 30, 31, 78, 2, 77, 82, 72];

console.log('\n Array: ', (cloneDeep(array)));

bubbleSort(array)
console.log('\n Sorted array: ', array);