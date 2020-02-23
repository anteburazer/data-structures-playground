import { cloneDeep } from 'lodash';

function selectionSort(array) {
    const length = array.length;
    let min;

    for (let i = 0; i <= length; i++) {
        min = i;

        for (let j = i + 1; j <= length; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }

        if (i !== min) {
            swap(array, i, min);
        }        
    }
}

function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

console.log('\n SELECTION SORT \n--------------------------------------------------\n');

const array = [72, 54, 59, 30, 31, 78, 2, 77, 82, 72];

console.log('\n Array: ', (cloneDeep(array)));

selectionSort(array)
console.log('\n Sorted array: ', array);