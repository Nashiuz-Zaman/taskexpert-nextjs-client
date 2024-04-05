'use client'

// hooks
import useGetInitialTasksData from '@/hooks/useGetInitialTasksData';

const TaskFetchingComponent = () => {
   useGetInitialTasksData();

   return null;
};

export default TaskFetchingComponent;
