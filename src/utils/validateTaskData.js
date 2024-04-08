export const validateTaskData = inputs => {
   const { title, description, deadline } = inputs;

   const foundErrors = [];

   if (title === '') {
      foundErrors.push('Must provide a title');
   }

   if (description === '') {
      foundErrors.push('Must provide a description');
   }

   if (!deadline) {
      foundErrors.push('Must provide a deadline');
   } else if (new Date(deadline) < new Date()) {
      foundErrors.push('Must provide a future deadline');
   }

   return foundErrors;
};
