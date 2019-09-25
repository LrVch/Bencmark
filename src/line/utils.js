export const getRandom = (min, max) =>
  min + Math.floor(Math.random() * (max + 1 - min));

export const mirrorArr = (arr, center) => {
  return arr
    .slice()
    .reverse()
    .map(elem => {
      const step = center - elem;
      // console.log("step", step);
      return center + step;
    });
};

export const getSymmetricArr = (length = 10, { min = -50, max = 50 } = {}) => {
  if (length > 100) {
    throw new Error("Length must be less or equal to 100");
  }

  const isOdd = length % 2 !== 0;
  const halfLength = isOdd ? (length - 1) / 2 : length / 2;
  // const half = [-32, -25, -23, -7, -2];
  const half = Array.from({ length: halfLength })
    .map(_ => getRandom(min, max / 2))
    .sort((a, b) => a - b);
  const edgeElement = half[halfLength - 1];
  const center = getRandom(edgeElement + 1, edgeElement + 9);
  const lastHalf = mirrorArr(half, center);
  const result = [...half, ...(isOdd ? [center] : []), ...lastHalf];

  // console.log("half", half);
  // console.log("center", center);
  // console.log("lastHalf", lastHalf);
  return {
    result,
    center
  };
};

export const getAsymmetricArr = (length =10, { min = -50, max = 50 } ={}) => 
  Array.from({length}).map(_ => getRandom(min, max))
