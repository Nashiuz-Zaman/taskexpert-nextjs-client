'use client';

// react
import PropTypes from 'prop-types';

// components
import BrandLogo from '@/components/shared/BrandLogo/BrandLogo';
import InnerContainer from '@/components/containers/InnerContainer/InnerContainer';
import MobileNav from '@/components/shared/MobileNav/MobileNav';
import HeaderAuthBtns from '../HeaderAuthBtns/HeaderAuthBtns';

const Header = ({ modifyClasses = '' }) => {
   return (
      <header className={`pt-5 lg:pt-6 ${modifyClasses}`}>
         <InnerContainer>
            {/* login/ register/ account name */}
            <HeaderAuthBtns modifyClasses='mb-5' />

            <div className='grid grid-cols-[1fr_3fr_1fr] 2md:grid-cols-2 items-center'>
               {/* div for design purpose */}
               <div className='2md:hidden'>&nbsp;</div>

               {/* website logo */}
               <BrandLogo modifyClasses='justify-self-center 2md:justify-self-start' />

               {/* auth related options login/logout etc */}
               <div className='flex items-center gap-3 justify-self-end'>
                  {/* mobile nav button and mobile nav menu */}
                  <MobileNav />
               </div>
            </div>
         </InnerContainer>
      </header>
   );
};

Header.propTypes = {
   modifyClasses: PropTypes.string,
};

export default Header;
