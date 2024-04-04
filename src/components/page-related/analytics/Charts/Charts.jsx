'use client';

// components
import BarChart from '@/components/shared/BarChart/BarChart';
import ChartHeading from '../ChartHeading/ChartHeading';

// hooks
import useProcessChartsData from '@/hooks/useProcessChartsData';

// redux
import { useSelector } from 'react-redux';

const Charts = () => {
   const { totalTasks } = useSelector(store => store.task);
   const { getStatusBasedTaskData } = useProcessChartsData();
   const statusBasedTaskData = getStatusBasedTaskData(totalTasks);

   return (
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
         <div>
            <ChartHeading text='Tasks by Status' />

            <BarChart
               data={statusBasedTaskData}
               modifyClasses='rounded-3xl border border-neutral-200 shadow-small'
            />
         </div>

         <div className='bg-orange-200'></div>
      </div>
   );
};

export default Charts;
