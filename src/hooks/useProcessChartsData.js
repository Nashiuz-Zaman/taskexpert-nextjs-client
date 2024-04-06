// data
import { statusOptions, priorityOptions } from '@/uiData/formsUiData';

// utils
import { findPercentage } from '@/utils/basicMathUtils';

const useProcessChartsData = () => {
   const getStatusBasedTaskData = data => {
      const statusBasedTaskData = statusOptions.map((status, i) => {
         return {
            id: i,
            name: status.text,
            number: 0,
            color: status.color,
            percentage: 0.0,
         };
      });

      if (!data?.length) {
         return statusBasedTaskData;
      }

      const total = data.length;
      const tempData = [...data];

      tempData.forEach(task => {
         const taskGroup = statusBasedTaskData[task?.statusLevel];

         taskGroup.number += 1;
         taskGroup.percentage = findPercentage(taskGroup.number, total);
      });

      return statusBasedTaskData;
   };

   const getPriorityBasedTaskData = data => {
      const priorityBasedTaskData = priorityOptions.map((priority, i) => {
         return {
            id: i,
            name: priority.text,
            number: 0,
            color: priority.color,
         };
      });

      if (!data?.length) {
         return priorityBasedTaskData;
      }

      const tempData = [...data];
      const total = data.length;

      tempData.forEach(task => {
         const taskGroup = priorityBasedTaskData[task?.priorityLevel];

         taskGroup.number += 1;
         taskGroup.percentage = findPercentage(taskGroup.number, total);
      });

      return priorityBasedTaskData;
   };

   return { getStatusBasedTaskData, getPriorityBasedTaskData };
};

export default useProcessChartsData;
