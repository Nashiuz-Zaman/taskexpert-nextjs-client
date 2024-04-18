// react
import PropTypes from 'prop-types';

// components
import { PriorityCard, TimeRemainingCard } from '@/components/shared';

const TaskSmallCard = ({ taskData, modifyClasses = '' }) => {
   const { i, title, deadline, priorityLevel } = taskData;

   const cellClasses = 'w-full block';
   return (
      <tr
         className={`w-full grid grid-cols-[1fr_4fr_3fr_4fr] items-center ${modifyClasses} text-[0.625rem] xs:text-xs sm:text-sm xl:text-base 3xl:text-lg`}
      >
         <th className={cellClasses}>{i + 1}</th>
         <td className={`${cellClasses} truncate`} title={title}>
            {title}
         </td>
         <td className={cellClasses}>
            <PriorityCard
               priorityLevel={priorityLevel}
               modifyClasses='mx-auto text-[0.625rem] xs:text-xs sm:text-sm xl:text-base 3xl:text-lg'
            />
         </td>
         <td className={`${cellClasses} truncate`} title={'Remaining Time'}>
            <TimeRemainingCard
               deadline={deadline}
               icon={false}
               text=''
               modifyClasses='w-max mx-auto'
            />
         </td>
      </tr>
   );
};

TaskSmallCard.propTypes = {
   taskData: PropTypes.object,
   modifyClasses: PropTypes.string,
};

export default TaskSmallCard;
