// Bubble sort
// swap function, takes an array and two items
function swap(array, i, j) {
  // create a temp variable that is the item in the array at i
  const temp = array[i];
  // reassign position i in the array to the item at position j in the array
  array[i] = array[j];
  // then assign position j in the array the value of the temp variable, which was the item at index i
  array[j] = temp;
}

// takes an array as a parameter
function bubbleSort(array) {
  // instantiate a variable that tracks the number of swaps that take place in one loop through the array
  let swaps = 0;
  /* start a loop. Thing to note is that we stop looping when i is equal or greater than array.length - 1 not array.length. That is because we reference array[i] and array[i + 1]. If you didn't stop the loop before i equalled array.length - 1 you would try to access an item with array[i + 1] that didn't exist. */
  for (let i = 0; i < array.length - 1; i++) {
    // compare item at i to item at i + 1. If i is greater than i + 1 perform a swap
    if (array[i] > array[i + 1]) {
      // call the swap function
      swap(array, i, i + 1);
      // increment swaps by 1
      swaps++;
    }
  }

  // if swaps occured in the previous loop, recursively call bubbleSort again on the array
  if (swaps > 0) {
    return bubbleSort(array);
  }
  // when no swaps occurred in a loop we will have finished sorting and we return the sorted array
  return array;
}

// Merge sort
// pass in an array
function mergeSort(array) {
  // if the array has a length of 0 or 1 it is by definition sorted, return the array
  if (array.length <= 1) {
    return array;
  }

  // find the middle of the array
  const middle = Math.floor(array.length / 2);
  // slice the left part of the array from index 0 to the middle
  let left = array.slice(0, middle);
  // slice the right part of the array from the middle to the end of the array
  let right = array.slice(middle, array.length);

  // recursively call mergeSort on the left array
  left = mergeSort(left);
  // recursively call mergeSort on the right array
  right = mergeSort(right);
  // return the left and right arrays merged into the original array
  return merge(left, right, array);
}

function merge(left, right, array) {
  // set leftIndex to 0, or the beginning of the array
  let leftIndex = 0;
  // set rightIndex to 0, or the beginning of the array
  let rightIndex = 0;
  // set outputIndex to 0, or the beginning of an array
  let outputIndex = 0;
  // while leftIndex is less than the length of the left array AND rightIndex is less than length of the right array, execute this loop
  while (leftIndex < left.length && rightIndex < right.length) {
    // compare the first item in left array to the first item in the right array, if the left is less than the right
    if (left[leftIndex] < right[rightIndex]) {
      // set the slot in the array at outputIndex + 1 to equal the left array at leftIndex + 1
      array[outputIndex++] = left[leftIndex++]; 
    }
    // otherwise, set it to the rigth array at rightIndex + 1
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  // if there aren't any items remaining in the right array
  for (let i = leftIndex; i < left.length; i++) {
    // move the rest of the items in left array to the array
    array[outputIndex++] = left[i];
  }

  // if there aren't any items remaining in the left array
  for (let i = rightIndex; i < right.length; i++) {
    // move the rest of the items in the right array to the array
    array[outputIndex++] = right[i];
  }
  // return the sorted array
  return array;
}

// Quicksort
// pass in an array, default start at 0 and default end at array.length
function quickSort(array, start = 0, end = array.length) {
  // if the start is greater than or equal to the array, return the array
  if (start >= end) {
    return array;
  }
  // the middle item of the array is the index returned by the partition function
  const middle = partition(array, start, end);
  // recursively quicksort from the beginning of the array to the middle
  array = quickSort(array, start, middle);
  // recursively quicksort from the middle of the array to the end
  array = quickSort(array, middle + 1, end);
  // return the array
  return array;
}

// pass an array and the start and end indexes
function partition(array, start, end) {
  // the pivot is the last item in the array
  const pivot = array[end - 1];
  // j starts as equal to the starting index
  let j = start;
  // i equals start index, as long as i is less than the end of the array minus one, increment i
  for (let i = start; i < end - 1; i++) {
    // if item i in the array is less than or equal to the pivot value, execute this block of code
    if (array[i] <= pivot) {
      // swap the values of i and j
      swap(array, i, j);
      // increment j
      j++;
    }
  }
  // swap the pivot to the position of j
  swap(array, end-1, j);
  // return the j index, everything to the left is less than the pivot, everything to the right is greater than the pivot
  return j;
}