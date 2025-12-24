// react
import PropTypes from 'prop-types';

// components
import {
   DashboardHeader,
   DashboardNav,
} from '@/components/page-related/dashboard-home';
import { TaskFetchingComponent } from './../../components/shared';

const DashboardLayout = ({ children }) => {
   return (
      <div className='max-w-[120rem] mx-auto h-screen grid grid-cols-1 2xl:grid-cols-[22.5rem_1fr]'>
         {/* fetch data */}

         <TaskFetchingComponent />

         <DashboardNav modifyClasses='hidden 2xl:block border-r border-neutral-200' />

         <div className='h-full'>
            <DashboardHeader />

            <div className='h-[calc(100vh-3.4375rem)] md:h-[calc(100vh-4rem)] 2md:h-[calc(100vh-5.8rem)] relative overflow-y-auto !bg-cover !bg-no-repeat !bg-center'>
               {/* page  */}
               {children}
            </div>
         </div>
      </div>
   );
};

DashboardLayout.propTypes = {
   children: PropTypes.any,
};

export default DashboardLayout;
