'use client';

// react
import { useCallback } from 'react';

const useTaskSeparator = () => {
   const findTasksByStatus = useCallback((allTasks, statusLevel) => {
      return allTasks.filter(task => task.statusLevel === statusLevel);
   }, []);

   const getStatusSpecificTasks = useCallback(
      allTasks => {
         const todoTasks = findTasksByStatus(allTasks, 0);
         const ongoingTasks = findTasksByStatus(allTasks, 1);
         const completedTasks = findTasksByStatus(allTasks, 2);

         return [
            { id: 0, name: 'Todo', statusSpecificTasks: todoTasks },
            { id: 1, name: 'Ongoing', statusSpecificTasks: ongoingTasks },
            { id: 2, name: 'Completed', statusSpecificTasks: completedTasks },
         ];
      },
      [findTasksByStatus]
   );

   return { getStatusSpecificTasks, findTasksByStatus };
};

export default useTaskSeparator;
