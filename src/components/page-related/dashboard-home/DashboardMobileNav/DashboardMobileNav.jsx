'use client';

// react
import PropTypes from 'prop-types';
import { useEffect } from 'react';

// components
import { CloseBtn, MobileMenuBtn, ButtonBtn } from '@/components/buttons';
import { BrandLogo } from '@/components/shared';
import DashboardNavContent from '../DashboardNavContent/DashboardNavContent';

// hook
import {
   useDashboardMobileNav,
   useEscapeClose,
   useLoginMethods,
   useClickOutside,
   useStopScrolling,
} from '@/hooks';

const DashboardMobileNav = ({
   modifyClasses = '',
   MenuBtnModifyClasses = '',
}) => {
   // initial functions and data extraction
   const {
      dashboardMobileNavOpen,
      openDashboardMobileNav,
      closeDashboardMobileNav,
   } = useDashboardMobileNav();
   const { handleLogout } = useLoginMethods();
   const { stopYAxisScrolling } = useStopScrolling();

   useEffect(() => {
      stopYAxisScrolling(dashboardMobileNavOpen);
   }, [dashboardMobileNavOpen, stopYAxisScrolling]);

   const handleClickOutside = e => {
      if (!e.target.closest('.dashboard-mobilenav-focus')) {
         closeDashboardMobileNav();
      }
   };

   useClickOutside(dashboardMobileNavOpen, handleClickOutside);
   useEscapeClose(closeDashboardMobileNav);

   return (
      <div className={`dashboard-mobilenav-focus ${modifyClasses}`}>
         <MobileMenuBtn
            modifyClasses={MenuBtnModifyClasses}
            openNavFunction={openDashboardMobileNav}
         />

         {/* mobile navigation */}
         <nav
            className={`block h-screen fixed top-0 left-0 w-full xs:w-[70%] sm:w-[50%] md:w-[40%] lg:w-[35%] 2xl:w-[20%] -translate-x-full origin-center transition-all duration-default z-40 overflow-x-hidden ${
               dashboardMobileNavOpen ? '!translate-x-0' : ''
            } p-6 bg-white`}
         >
            {/* close nav button */}
            <CloseBtn
               onClickFunction={closeDashboardMobileNav}
               modifyClasses='mb-4 md:mb-7 text-xl md:text-3xl'
            />

            {/* brandlogo */}
            <BrandLogo
               onClickFunction={closeDashboardMobileNav}
               modifyClasses='h-6 mb-6 md:mb-12 xl:h-10'
            />

            <DashboardNavContent />

            {/* signout button */}
            <ButtonBtn
               text='Sign Out'
               onClickFunction={() => {
                  handleLogout();
                  closeDashboardMobileNav();
               }}
               modifyClasses='mt-11'
            />
         </nav>
      </div>
   );
};

DashboardMobileNav.propTypes = {
   modifyClasses: PropTypes.string,
   MenuBtnModifyClasses: PropTypes.string,
};

export default DashboardMobileNav;
