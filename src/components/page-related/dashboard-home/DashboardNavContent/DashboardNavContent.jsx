'use client';

// react
import PropTypes from 'prop-types';

// icons
import { Icon } from '@iconify/react';

// components
import { DashboardNavHeading, PinnedTask, DashboardNavLink } from './../index';

// hook
import { useDashboardMobileNav } from '@/hooks';

// redux
import { useSelector } from 'react-redux';

const DashboardNavContent = ({ modifyClasses = '' }) => {
   const { pinnedTasks } = useSelector(store => store.task);
   const { profileData } = useSelector(store => store.auth);
   const { closeDashboardMobileNav } = useDashboardMobileNav();

   const primaryOptions = [
      {
         text: 'Manage Tasks',
         icon: <Icon icon='fluent:tasks-app-20-filled' />,
         url: `/manage-tasks?id=${profileData?._id}`,
      },
      {
         text: 'Analytics',
         icon: <Icon icon='solar:chart-2-bold' />,
         url: `/analytics?id=${profileData?._id}`,
      },
   ];

   const accountOptions = [
      {
         text: 'Settings',
         icon: <Icon icon='solar:settings-bold' />,
         url: `/settings?id=${profileData?._id}`,
      },
   ];

   return (
      <div className={`space-y-3 md:space-y-6 ${modifyClasses}`}>
         {/* pinned tasks */}
         <div className='pb-3 md:pb-6 border-b border-neutral-200'>
            <DashboardNavHeading
               text='Pinned Task'
               modifyClasses='mb-2 md:mb-6'
            />

            {/* if no pinned tasks */}
            {!pinnedTasks?.length && <PinnedTask modifyClasses='ml-4' />}

            {/* if pinned tasks  */}
            {pinnedTasks?.length > 0 && (
               <div className='space-y-2'>
                  {pinnedTasks.map(task => (
                     <PinnedTask
                        key={task._id}
                        defaultValue={false}
                        task={task}
                        modifyClasses='ml-4'
                     />
                  ))}
               </div>
            )}
         </div>

         {/* dashboard pages */}
         <div className='pb-6 border-b border-neutral-200'>
            <DashboardNavHeading text='Menu' modifyClasses='mb-2 md:mb-6' />

            {/* the navigation menu */}
            <ul className='space-y-3'>
               {primaryOptions.map((option, i) => {
                  return (
                     <li key={i} className='ml-4'>
                        <DashboardNavLink
                           onClickFunction={() => closeDashboardMobileNav()}
                           linkData={option}
                        />
                     </li>
                  );
               })}
            </ul>
         </div>

         {/* account pages */}
         <div>
            <DashboardNavHeading text='Account' modifyClasses='mb-2 md:mb-6' />

            {/* the navigation menu */}
            <ul className='space-y-3'>
               {accountOptions.map((option, i) => {
                  return (
                     <li key={i} className='ml-4'>
                        <DashboardNavLink
                           onClickFunction={() => closeDashboardMobileNav()}
                           linkData={option}
                        />
                     </li>
                  );
               })}
            </ul>
         </div>
      </div>
   );
};

DashboardNavContent.propTypes = {
   modifyClasses: PropTypes.string,
};

export default DashboardNavContent;
