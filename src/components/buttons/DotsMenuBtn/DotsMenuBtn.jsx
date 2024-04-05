// react
import PropTypes from 'prop-types';

// icons
import { Icon } from '@iconify/react';

const DotsMenuBtn = ({ onClickFunction, modifyClasses = '' }) => {
   return (
      <button
         onClick={onClickFunction}
         className={`block text-neutral-500 hover:text-primary transition-all duration-default ${modifyClasses}`}
      >
         <Icon
            className='text-4xl text-inherit'
            icon='heroicons-solid:dots-horizontal'
         />
      </button>
   );
};

DotsMenuBtn.propTypes = {
   onClickFunction: PropTypes.func,
   modifyClasses: PropTypes.string,
};

export default DotsMenuBtn;
