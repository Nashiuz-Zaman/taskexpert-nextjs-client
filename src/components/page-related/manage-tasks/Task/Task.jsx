'use client';

// react
import { useState } from 'react';
import PropTypes from 'prop-types';

//  icons
import { Icon } from '@iconify/react';

// component
import { PriorityCard, MenuPanel } from '@/components/shared';
import {
   EditBtn,
   DeleteBtn,
   PinBtn,
   ViewDetailsBtn,
   DotsMenuBtn,
   MoveToOngoingBtn,
   MoveToCompletedBtn,
   MoveToTodoBtn,
} from '@/components/buttons';

// hook
import {
   useTaskDatabaseMethods,
   useFormVisiblity,
   useMediaQueryMatcher,
   useRedux,
} from '@/hooks';

// redux
import {
   setTaskToEdit,
   setTaskDetails,
} from '@/lib/redux/features/task/taskSlice';

// utils
import { useTaskDragDropProvider } from '@/utils/TaskDragDropUtils';
import { getDayMonthNameYearStr } from '@/utils/dateTimeMethods';

const Task = ({ taskData }) => {
   // necessary hooks and data extraction
   const { dispatch, useSelector } = useRedux();
   const { totalTasks, pinnedTasks } = useSelector(store => store.task);
   const [isDragging, setIsDragging] = useState(false);
   const [menuPanelOpen, setMenuPanelOpen] = useState(false);
   const { deleteTask, updateTaskStatus, pinTask } = useTaskDatabaseMethods();
   const { findDropzoneElementId, dropzoneElementRefs } =
      useTaskDragDropProvider();
   const { openTaskEditForm, openTaskDetailsPanel } = useFormVisiblity();
   const { _id, title, statusLevel, deadline, priorityLevel } = taskData;
   const deadlineStr = getDayMonthNameYearStr(deadline);
   const { isComputer } = useMediaQueryMatcher();

   const handleMenuPanel = () => {
      setMenuPanelOpen(prev => !prev);
   };

   return (
      <div
         className={`border relative border-neutral-200 shadow-sm rounded-lg p-3 pb-4 text-lg flex flex-col cursor-grab animate-fadeIn ${
            isDragging
               ? 'opacity-30 !cursor-grabbing'
               : 'opacity-100 !cursor-pointer'
         }`}
         draggable={isComputer ? true : false}
         onTouchStart={isComputer ? () => setIsDragging(true) : null}
         onTouchEnd={
            isComputer
               ? e => {
                    const status = findDropzoneElementId(
                       e,
                       dropzoneElementRefs,
                       'touch'
                    );

                    const statusLevel =
                       status === 'todo' ? 0 : status === 'ongoing' ? 1 : 2;

                    if (status) {
                       updateTaskStatus(_id, statusLevel, totalTasks);
                    }
                    setIsDragging(false);
                 }
               : null
         }
         onDragStart={() => {
            setIsDragging(true);
         }}
         onDragEnd={e => {
            const status = findDropzoneElementId(
               e,
               dropzoneElementRefs,
               'mouse'
            );

            const statusLevel =
               status === 'todo' ? 0 : status === 'ongoing' ? 1 : 2;

            if (status) {
               updateTaskStatus(_id, statusLevel, totalTasks);
            }
            setIsDragging(false);
         }}
      >
         {/* priority and dot button */}
         <div className='flex items-center justify-between mb-3 md:mb-4'>
            <PriorityCard priorityLevel={priorityLevel} />

            {/* three dotted menu button */}
            <DotsMenuBtn
               onClickFunction={handleMenuPanel}
               modifyClasses='ml-auto mr-2'
            />

            <MenuPanel
               modifyClasses='!text-sm sm:!text-base 2md:!text-lg xl:!text-xl w-max !space-y-2 2md:!space-y-4'
               show={menuPanelOpen}
               setShow={setMenuPanelOpen}
            >
               <ViewDetailsBtn
                  onClickFunction={() => {
                     dispatch(setTaskDetails(taskData?._id));
                     openTaskDetailsPanel();
                     setMenuPanelOpen(false);
                  }}
                  text='View Details'
               />
               <EditBtn
                  onClickFunction={() => {
                     setMenuPanelOpen(false);
                     dispatch(setTaskToEdit(taskData));
                     openTaskEditForm();
                  }}
                  text='Edit Task'
               />
               <PinBtn
                  onClickFunction={() => {
                     setMenuPanelOpen(false);
                     pinTask(taskData, pinnedTasks);
                  }}
                  text='Pin Task'
               />

               {statusLevel !== 0 && (
                  <MoveToTodoBtn
                     onClickFunction={() => {
                        updateTaskStatus(_id, 0, totalTasks);
                     }}
                     text='Mark as Todo'
                  />
               )}

               {statusLevel !== 1 && (
                  <MoveToOngoingBtn
                     onClickFunction={() => {
                        updateTaskStatus(_id, 1, totalTasks);
                     }}
                     text='Mark as Ongoing'
                  />
               )}

               {statusLevel !== 2 && (
                  <MoveToCompletedBtn
                     onClickFunction={() => {
                        updateTaskStatus(_id, 2, totalTasks);
                     }}
                     text='Mark as Completed'
                  />
               )}

               {/* delete button */}
               <DeleteBtn
                  onClickFunction={() => {
                     deleteTask(_id, totalTasks, pinnedTasks);
                  }}
                  text='Delete'
               />
            </MenuPanel>
         </div>

         {/* title */}
         <h4 className='font-bold text-base md:text-lg mb-2 !leading-none'>
            {title}
         </h4>

         {/* deadline */}
         <div title='Deadline' className='flex w-max items-center gap-1'>
            <Icon
               className='text-neutral-500 text-xl'
               icon='ph:calendar-fill'
            />
            <span className='text-neutral-500 font-semibold text-sm !leading-none'>
               {deadlineStr}
            </span>
         </div>
      </div>
   );
};

Task.propTypes = {
   taskData: PropTypes.object,
};

export default Task;
