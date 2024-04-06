// react
import PropTypes from 'prop-types';

const PriorityCard = ({ priorityLevel = 0, modifyClasses = '' }) => {
   // priority data info
   const priorities = [
      {
         text: 'Low',
         bgColor: 'bg-green-100',
         textColor: 'text-green-500',
      },
      {
         text: 'Medium',
         bgColor: 'bg-orange-100',
         textColor: 'text-orange-500',
      },
      {
         text: 'High',
         bgColor: 'bg-red-100',
         textColor: 'text-red-500',
      },
   ];

   // set priority color and text
   const priorityBgColor = priorities[priorityLevel]?.bgColor;
   const priorityTextColor = priorities[priorityLevel]?.textColor;
   const priorityText = priorities[priorityLevel]?.text;

   return (
      <p
         className={`w-max px-3 py-[6px] font-semibold rounded-md text-xs sm:text-sm ${priorityBgColor} ${priorityTextColor} ${modifyClasses}`}
         title={`${priorityText} priority`}
      >
         {priorityText}
      </p>
   );
};

PriorityCard.propTypes = {
   priorityLevel: PropTypes.number,
   modifyClasses: PropTypes.string,
};

export default PriorityCard;
