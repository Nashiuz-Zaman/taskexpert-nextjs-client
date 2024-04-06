'use client';

// react
import PropTypes from 'prop-types';

// components
import TaskSmallCard from '../TaskSmallCard/TaskSmallCard';
import { useEffect, useState } from 'react';

const TasksBlock = ({ data, label, modifyClasses = '' }) => {
   const [isClient, setIsClient] = useState(false);
   const rowClasses = 'w-full grid grid-cols-[1fr_4fr_2fr_4fr] items-center';
   const cellClasses = 'w-full';

   useEffect(() => {
      setIsClient(true);
   }, []);

   if (isClient) {
      return (
         <div
            className={`aspect-[16/10] px-2 py-5 sm:py-8 sm:px-4 xl:px-5 2xl:px-6 ${modifyClasses}`}
         >
            <table className='flex flex-col w-full h-full text-left'>
               {/* head */}
               <thead className='block w-full mb-6 text-[0.625rem] xs:text-xs sm:text-sm xl:text-base 3xl:text-lg'>
                  <tr className={rowClasses}>
                     <th className={cellClasses}>No.</th>
                     <th className={cellClasses}>Title</th>
                     <th className={`${cellClasses} text-center`}>Priority</th>
                     <th className={`${cellClasses} text-center`}>Time Left</th>
                  </tr>
               </thead>

               {!data?.length && (
                  <tbody className='block pt-[5rem]'>
                     <tr className='block'>
                        <td className='block text-center font-semibold '>
                           No {label} tasks
                        </td>
                     </tr>
                  </tbody>
               )}
               {data?.length > 0 && (
                  <tbody className='block grow w-full space-y-4 pr-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-white'>
                     {/* rows */}
                     {data.map((d, i) => {
                        const taskData = { ...d, i };
                        return (
                           <TaskSmallCard key={d._id} taskData={taskData} />
                        );
                     })}
                  </tbody>
               )}
            </table>
         </div>
      );
   }
};

TasksBlock.propTypes = {
   data: PropTypes.array,
   modifyClasses: PropTypes.string,
};

export default TasksBlock;
