function mergeSort(array) {
    if (array.length < 2) {
        return array;
    }

    const midPoint = Math.floor(array.length / 2);
    const left= array.slice(0, midPoint);
    const right= array.slice(midPoint);

    return merge(mergeSort(left), mergeSort(right));
}

// left and right arrays are always sorted
function merge(left, right) {
    const result = [];
    let indexA = 0;
    let indexB = 0;

    while (indexA < left.length && indexB < right.length) {
        if (left[indexA] < right[indexB]) {
            result.push(left[indexA]);
            indexA++;
        } else {
            result.push(right[indexB]);
            indexB++;
        }
    }

    const remainsLeft = left.slice(indexA);
    const remainsRight = right.slice(indexB);

    return [...result, ...remainsLeft, ...remainsRight];
}

console.log('\n MERGE SORT \n--------------------------------------------------\n');

const array = [72, 54, 59, 30, 31, 78, 2, 77, 82, 72];

console.log('\n Array: ', array);

const newArray = mergeSort(array)
console.log('\n Sorted array: ', newArray);