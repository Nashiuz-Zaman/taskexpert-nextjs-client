// data
import { statusOptions, priorityOptions } from '@/uiData/formsUiData';

const useProcessChartsData = () => {
   const getStatusBasedTaskData = data => {
      const statusBasedTaskData = statusOptions.map((status, i) => {
         return {
            id: i,
            name: status.text,
            number: 0,
            color: status.color,
         };
      });

      if (!data?.length) {
         return statusBasedTaskData;
      }

      const tempData = [...data];

      tempData.forEach(task => {
         const taskGroup = statusBasedTaskData[task?.statusLevel];

         taskGroup.number += 1;
      });

      return statusBasedTaskData;
   };

   const getPriorityBasedTaskData = data => {
      const priorityBasedTaskData = priorityOptions.map(priority => {
         return {
            name: priority.text,
            number: 0,
            color: priority.color,
         };
      });

      if (!data?.length) {
         return priorityBasedTaskData;
      }

      const tempData = [...data];

      tempData.forEach(task => {
         const taskGroup = priorityBasedTaskData[task?.priorityLevel];

         taskGroup.number += 1;
      });

      return priorityBasedTaskData;
   };

   return { getStatusBasedTaskData, getPriorityBasedTaskData };
};

export default useProcessChartsData;
