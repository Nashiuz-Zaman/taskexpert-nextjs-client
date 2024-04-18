'use client';

// components
import TasksBlock from '../TasksBlock/TasksBlock';
import ChartHeading from '../ChartHeading/ChartHeading';

// hook
import { useTaskSeparator } from '@/hooks';

// redux
import { useSelector } from 'react-redux';

const TasksInfo = () => {
   const { totalTasks } = useSelector(store => store.task);
   const { findTasksByStatus } = useTaskSeparator();

   const todoTasks = totalTasks && findTasksByStatus(totalTasks, 0);
   const ongoingTasks = totalTasks && findTasksByStatus(totalTasks, 1);

   return (
      <section className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
         <div>
            <ChartHeading text='Todo Tasks (Overview)' />

            <TasksBlock
               data={todoTasks}
               label='Todo'
               modifyClasses='rounded-lg md:rounded-2xl xl:rounded-3xl border border-neutral-200 shadow-small'
            />
         </div>

         <div>
            <ChartHeading text='Ongoing Tasks (Overview)' />

            <TasksBlock
               data={ongoingTasks}
               label='Ongoing'
               modifyClasses='rounded-lg md:rounded-2xl xl:rounded-3xl border border-neutral-200 shadow-small'
            />
         </div>
      </section>
   );
};

export default TasksInfo;
