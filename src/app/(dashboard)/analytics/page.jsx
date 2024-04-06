// components
import Charts from '@/components/page-related/analytics/Charts/Charts';
import TasksInfo from '@/components/page-related/analytics/TasksInfo/TasksInfo';

const page = () => {
   return (
      <div className='py-8 md:py-12 lg:py-14 xl:py-16 px-4 md:px-8 xl:px-16'>
         <h2 className='text-center mb-6 xl:mb-12 font-bold text-lg lg:text-2xl underline'>
            Overview
         </h2>

         {/* charts  */}
         <Charts />

         {/* task info */}
         <TasksInfo />
      </div>
   );
};

export default page;
