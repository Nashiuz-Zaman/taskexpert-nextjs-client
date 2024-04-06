// react
import PropTypes from 'prop-types';

// hooks
import useClickOutside from '../../../hooks/useClickOutside';

const MenuPanel = ({ show = false, setShow, children, modifyClasses = '' }) => {
   const handleClickOutside = e => {
      if (!e.target.closest('.menu-panel-focus')) {
         setShow(false);
      }
   };
   useClickOutside(show, handleClickOutside);

   return (
      <div
         className={`absolute w-max top-1/3 right-0 z-[1000] bg-white border border-neutral-200 shadow-md rounded-xl p-4 px-5 space-y-4 menu-panel-focus ${
            show ? 'block' : 'hidden'
         } ${modifyClasses}`}
      >
         {children}
      </div>
   );
};

MenuPanel.propTypes = {
   show: PropTypes.bool,
   setShow: PropTypes.func,
   children: PropTypes.any,
   modifyClasses: PropTypes.string,
};

export default MenuPanel;
