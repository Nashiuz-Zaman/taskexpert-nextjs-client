// react
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// icons
import { Icon } from '@iconify/react';

// utils
import { getRemainingTime, padTime } from '@/utils/dateTimeMethods';

const TimeRemainingCard = ({
   text = 'Remaining Time: ',
   deadline,
   modifyClasses = '',
   icon = true,
}) => {
   const [remainingTimeDetails, setRemainingTimeDetails] = useState(
      getRemainingTime(deadline)
   );

   useEffect(() => {
      const intervalId = setInterval(() => {
         setRemainingTimeDetails(getRemainingTime(deadline));
      }, 1000);

      return () => clearInterval(intervalId);
   }, [deadline]);

   return (
      <div className={`flex items-center gap-1 ${modifyClasses}`}>
         {icon && <Icon icon='ph:clock-fill' className='block' />}

         {/* time remaining part */}
         <p style={{ fontWeight: 'inherit' }}>
            <span>{text}</span>

            <span>
               {/* month */}
               {remainingTimeDetails?.months > 0
                  ? `${remainingTimeDetails.months}mo`
                  : ''}{' '}
               {/* day */}
               {remainingTimeDetails?.days > 0
                  ? `${remainingTimeDetails.days}d`
                  : ''}{' '}
               {/* hours */}
               {padTime(remainingTimeDetails.hours) ?? ''}:{/* minutes */}
               {padTime(remainingTimeDetails.minutes) ?? ''}:{/* seconds */}
               {padTime(remainingTimeDetails.seconds) ?? ''}
            </span>
         </p>
      </div>
   );
};

TimeRemainingCard.propTypes = {
   text: PropTypes.any,
   deadline: PropTypes.string,
   icon: PropTypes.bool,
   modifyClasses: PropTypes.string,
};

export default TimeRemainingCard;
