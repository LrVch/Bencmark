// import { getAsymmetricArr, getSymmetricArr } from "./utils";

// const sourceSimetredEven = [5, -5, 10, -10];
// const sourceSimetredOdd = [-10, -5, 0, 5, 10];
// const sourceNotSimetredEven = [-10, -5, 5, 11];
// const sourceNotSimetredOdd = [22, -10, -5, 0, 5, 11, 13];

export function findLine(arr = []) {
  const sorted = arr.slice().sort((a, b) => a - b);
  const arrLength = sorted.length;
  const isOdd = arrLength % 2 !== 0;
  // console.log("sorted", sorted);
  const sliceLength = isOdd ? (arrLength - 1) / 2 : arrLength / 2;
  const leftSlice = sorted.slice(0, sliceLength).reverse();
  const rightSlice = sorted.slice(isOdd ? sliceLength + 1 : sliceLength);
  const oddElement = isOdd ? sorted[sliceLength] : null;
  const center = (rightSlice[0] - leftSlice[0]) / 2 + leftSlice[0];
  const isOddMatchCenter = oddElement === center;
  
  const res = rightSlice
  .map((elem, index) => {
    return Math.abs(center - elem) === Math.abs(leftSlice[index] - center);
  })
  .every(elem => !!elem);
  
  // console.log("leftSlice", leftSlice);
  // console.log("rightSlice", rightSlice);
  // console.log("oddElement", oddElement);
  // console.log("center", center);
  // console.log("res", res);
  // console.log("===".repeat(20));

  // const res = res.every(elem => !!elem)
  const result = isOdd ? (isOddMatchCenter ? res : false) : res;

  return {
    center,
    isOdd,
    oddElement,
    isOddMatchCenter: isOdd ? isOddMatchCenter : null,
    result,
    arr
  };
};

findLine.sourceName = 'findLine'

// console.log(findLine([-6, 0, 4, 8, 14]));
// console.log(findLine([1, 2, 4]));
// console.log(findLine([-2, 7, 16]));

// console.log("===".repeat(20));
// console.log('Symmetric');

// console.log(findLine(getSymmetricArr(7).result));
// console.log(findLine(getSymmetricArr(3).result));
// console.log(findLine(getSymmetricArr(10).result));
// console.log(findLine(getSymmetricArr(4).result));
// console.log(findLine(getSymmetricArr(16).result));
// console.log(findLine(getSymmetricArr(25).result));

// console.log("===".repeat(20));
// console.log('Asymmetric');
// console.log(getAsymmetricArr());


// console.log(findLine(getAsymmetricArr(7)));
// console.log(findLine(getAsymmetricArr(3)));
// console.log(findLine(getAsymmetricArr(10)));
// console.log(findLine(getAsymmetricArr(4)));
// console.log(findLine(getAsymmetricArr(16)));
// console.log(findLine(getAsymmetricArr(25)));

