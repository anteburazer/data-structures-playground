import { cloneDeep } from 'lodash';

function insertionSort(array) {
    const length = array.length;
    let value;

    for (let i = 0; i < length; i++) {
        value = array[i];

        for (var j = i - 1; j > -1 && array[j] > value; j--) {
            array[j + 1] = array[j];
        }

        array[j + 1] = value;
    }
}

console.log('\n INSERTION SORT \n--------------------------------------------------\n');

const array = [72, 54, 59, 30, 31, 78, 2, 77, 82, 72];

console.log('\n Array: ', (cloneDeep(array)));

insertionSort(array)
console.log('\n Sorted array: ', array);