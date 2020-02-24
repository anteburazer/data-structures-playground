/*
 * 1) Pick a pivot element that divides the list into two sublists.
 * 2) Reorder the list so that all elements less than the pivot element are placed before the pivot 
 *    and all elements greater than the pivot are placed after it.
 * 3) Repeat steps 1 and 2 on both the list with smaller elements and the list of larger elements.
 */

function quickSort(array) {
    if (!array.length) {
        return [];
    }

    const pivot = array[0];
    const left = [];
    const right = [];

    for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        }

        if (array[i] > pivot) {
            right.push(array[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log('\n QUICK SORT \n--------------------------------------------------\n');

const array = [72, 54, 59, 30, 31, 78, 2, 77, 82, 72];

console.log('\n Array: ', array);

const newArray = quickSort(array)
console.log('\n Sorted array: ', newArray);