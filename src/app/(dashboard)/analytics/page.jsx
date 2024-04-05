// components
import Charts from '@/components/page-related/analytics/Charts/Charts';

const page = () => {
   return (
      <div className='pt-8 md:pt-12 lg:pt-14 xl:pt-16 px-4 md:px-8 xl:px-16'>
         <h2 className='text-center mb-6 font-bold text-lg lg:text-2xl underline'>Overview</h2>

         {/* charts  */}
         <Charts />
      </div>
   );
};

export default page;
