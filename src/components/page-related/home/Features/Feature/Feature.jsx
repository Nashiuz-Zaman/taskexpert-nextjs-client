// react
import PropTypes from 'prop-types';

// component
import { Text } from '@/components/shared';
import FeatureIcon from '../FeatureIcon/FeatureIcon';

const Feature = ({ featureData, modifyClasses = '' }) => {
   const { heading, description, icon } = featureData;

   return (
      <div
         className={`text-center rounded-lg md:rounded-xl lg:rounded-2xl p-6 2md:py-7 bg-white border border-neutral-200 shadow-small ${modifyClasses}`}
      >
         <FeatureIcon icon={icon} modifyClasses='mx-auto mb-5' />

         <h3 className='font-bold text-textPrimary text-xl mb-2'>{heading}</h3>

         <Text text={description} />
      </div>
   );
};

Feature.propTypes = {
   featureData: PropTypes.object,
   modifyClasses: PropTypes.string,
};

export default Feature;
