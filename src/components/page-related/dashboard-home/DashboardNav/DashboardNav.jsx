// react
import PropTypes from 'prop-types';

// components
import { BrandLogo } from '../../../shared';
import DashboardNavContent from '../DashboardNavContent/DashboardNavContent';

const DashboardNav = ({ modifyClasses = '' }) => {
   return (
      <div className={`py-9 px-6 ${modifyClasses}`}>
         {/* website logo */}
         <BrandLogo modifyClasses='mb-16 lg:!h-10' />

         <DashboardNavContent />
      </div>
   );
};

DashboardNav.propTypes = {
   modifyClasses: PropTypes.string,
};

export default DashboardNav;
