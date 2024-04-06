// react
import PropTypes from 'prop-types';

const ChartHeading = ({ text, modifyClasses = '' }) => {
   return (
      <h3
         className={`font-semibold sm:text-lg lg:text-xl mb-4 text-center sm:text-left ${modifyClasses}`}
      >
         {text}
      </h3>
   );
};

ChartHeading.propTypes = {
   text: PropTypes.string,
   modifyClasses: PropTypes.string,
};

export default ChartHeading;
