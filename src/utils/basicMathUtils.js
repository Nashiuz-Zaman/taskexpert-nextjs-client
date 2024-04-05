export const findPercentage = (number, total) => {
   const percentage = (number / total) * 100;
   return percentage.toFixed(1);
};

export const findSum = arr => {
   return arr.reduce((prev, cur) => prev + cur, 0);
};
