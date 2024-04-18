'use client';

// icons
import { Icon } from '@iconify/react';

// components
import { CloseBtn, DeleteBtn } from '@/components/buttons';
import { PriorityCard, TimeRemainingCard } from '@/components/shared';

// hooks
import {
   useClickOutside,
   useEscapeClose,
   useTaskDatabaseMethods,
   useFormVisiblity,
   useRedux
} from '@/hooks';

// redux
import { setTaskDetails } from '@/lib/redux/features/task/taskSlice';

// utils
import { getDayMonthNameYearStr } from '@/utils/dateTimeMethods';

const TaskDetailsPanel = () => {
   const { dispatch, useSelector } = useRedux();
   const { deleteTask } = useTaskDatabaseMethods();
   const { taskDetails, showTaskDetailsPanel, totalTasks, pinnedTasks } =
      useSelector(store => store.task);
   const { closeTaskDetailsPanel } = useFormVisiblity();

   const handleClickOutside = e => {
      if (!e.target.closest('.task-details-panel-focus')) {
         closeTaskDetailsPanel();
         dispatch(setTaskDetails(null));
      }
   };

   useClickOutside(showTaskDetailsPanel, handleClickOutside);
   useEscapeClose(() => {
      closeTaskDetailsPanel();
      dispatch(setTaskDetails(null));
   });

   if (taskDetails) {
      return (
         <div
            className={`${
               showTaskDetailsPanel
                  ? 'opacity-100 visible'
                  : 'opacity-0 collapse'
            } transition-all !duration-default shadow-small border border-neutral-300 fixed top-1/2 w-[90%] sm:w-[30rem] -translate-y-1/2 left-1/2 -translate-x-1/2 p-6 bg-white z-40 rounded-xl task-details-panel-focus`}
         >
            {/* close button */}
            <CloseBtn
               modifyClasses='text-neutral-400 text-xl mb-3'
               onClickFunction={() => {
                  closeTaskDetailsPanel();
                  dispatch(setTaskDetails(null));
               }}
            />

            {/* title */}
            <h3 className='text-xl lg:text-2xl !leading-none font-extrabold mb-5'>
               {taskDetails.title}
            </h3>

            {/* priority card */}
            <PriorityCard
               priorityLevel={taskDetails.priorityLevel}
               modifyClasses='mb-5'
            />

            {/* deadline  */}
            <div className='text-sm md:text-base 3xl:text-lg flex items-center gap-1 mb-3 text-neutral-500 font-medium !leading-none'>
               <Icon icon='ph:calendar-fill' className='block' />
               <p className='!leading-inherit'>
                  <span>Deadline: </span>
                  <span>{getDayMonthNameYearStr(taskDetails.deadline)}</span>
               </p>
            </div>

            {/* time remaining */}
            <TimeRemainingCard
               text='Time Left: '
               modifyClasses='text-sm font-medium md:text-base 3xl:text-lg mb-7 text-neutral-500 !leading-none'
               deadline={taskDetails.deadline}
            />

            {/* description */}

            <div className='h-[10rem] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-white mb-5'>
               <h4 className='text-lg lg:text-xl font-extrabold mb-2'>
                  Description
               </h4>
               <p className='lg:text-lg font-medium text-neutral-500'>
                  {taskDetails.description}
               </p>
            </div>

            {/* buttons */}

            <DeleteBtn
               onClickFunction={() => {
                  deleteTask(taskDetails._id, totalTasks, pinnedTasks);
                  closeTaskDetailsPanel();
               }}
               text='Delete Task'
               modifyClasses='font-medium w-max ml-auto'
            />
         </div>
      );
   }
};

export default TaskDetailsPanel;
