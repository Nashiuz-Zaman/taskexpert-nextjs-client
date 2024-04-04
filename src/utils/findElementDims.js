export const findDims = ref => {
   const cssProps = window?.getComputedStyle(ref?.current);
   const width = parseFloat(cssProps['width']);
   const height = parseFloat(cssProps['height']);

   return { width, height };
};
