'use client';

// react
import PropTypes from 'prop-types';

// component
import StatusSpecificTasks from '../StatusSpecificTasks/StatusSpecificTasks';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

// hooks
import useTaskSeparator from '@/hooks/useTaskSeparator';

// redux
import { useSelector } from 'react-redux';

// utils
import { useTaskDragDropProvider } from '@/utils/TaskDragDropUtils';

const AllTasks = ({ modifyClasses = '' }) => {
   const { dropzoneElementRefs } = useTaskDragDropProvider();
   const { totalTasks, isLoading } = useSelector(store => store.task);
   const { searchTerm } = useSelector(store => store.search);
   const { taskFilterParams } = useSelector(store => store.filter);
   const { prioritySortParam } = useSelector(store => store.sort);
   const { getStatusSpecificTasks } = useTaskSeparator();

   let tasksToShow = totalTasks
      ?.filter(task => taskFilterParams.includes(task.priorityLevel))
      ?.filter(task => task.title.toLowerCase().includes(searchTerm));

   tasksToShow.sort((a, b) => {
      if (prioritySortParam === 0) {
         return 0;
      }

      if (prioritySortParam === 1) {
         return a.priorityLevel - b.priorityLevel;
      }

      if (prioritySortParam === 2) {
         return b.priorityLevel - a.priorityLevel;
      }
   });

   tasksToShow = getStatusSpecificTasks(tasksToShow);

   return (
      <div
         className={`h-[57vh] md:h-[70vh] lg:h-[60vh] 2xl:h-[65vh] bg-white mx-auto w-[52.5rem] xs:w-[60rem] sm:w-[70rem] xl:max-w-[89.5rem] xl:w-full shadow-medium rounded-xl ${modifyClasses}`}
      >
         {isLoading && (
            <LoadingSpinner
               text='Loading Data'
               textSizeClass='!text-3xl !text-primary'
               loaderSizeClass='!text-4xl !text-primary'
               modifyClasses='h-full flex items-center justify-center'
            />
         )}

         {!isLoading && (
            <div
               className={`grid grid-cols-3 h-full gap-2 xs:gap-3 sm:gap-4 p-3 md:p-5 lg:p-7`}
            >
               {tasksToShow?.map(singleCollection => {
                  return (
                     <StatusSpecificTasks
                        ref={dropzoneElementRefs}
                        key={singleCollection.id}
                        tasksData={singleCollection}
                     />
                  );
               })}
            </div>
         )}
      </div>
   );
};

AllTasks.propTypes = {
   modifyClasses: PropTypes.string,
};

export default AllTasks;
