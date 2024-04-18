// react
import PropTypes from 'prop-types';

// component
import { UnpinBtn } from '@/components/buttons';

// hook
import { useTaskDatabaseMethods, useRedux, useFormVisiblity } from '@/hooks';

// redux
import { setTaskDetails } from '@/lib/redux/features/task/taskSlice';

const PinnedTask = ({ defaultValue = true, task, modifyClasses = '' }) => {
   const { dispatch, useSelector } = useRedux();
   const { unpinTask } = useTaskDatabaseMethods();
   const { pinnedTasks } = useSelector(store => store.task);
   const { openTaskDetailsPanel } = useFormVisiblity();

   return (
      <div
         onClick={e => {
            if (!defaultValue) {
               if (!e.target.closest('.unpin-custom-focus')) {
                  dispatch(setTaskDetails(task.taskId));
                  openTaskDetailsPanel();
               }
            }
         }}
         title={task?.title ?? 'No Pinned tasks'}
         className={`flex items-center gap-3 font-medium text-sm md:text-lg lg:text-xl px-4 py-2 rounded-default text-neutral-500 border border-neutral-200 shadow-md ${
            defaultValue ? '' : 'cursor-pointer'
         } pointer ${modifyClasses}`}
      >
         <span className='truncate'>
            {defaultValue ? 'No Pinned Tasks' : task.title}
         </span>

         {!defaultValue && (
            <UnpinBtn
               onClickFunction={e => {
                  e.preventDefault();
                  unpinTask(task._id, pinnedTasks);
               }}
               modifyClasses='!ml-auto text-sm md:text-lg lg:text-xl unpin-custom-focus'
            />
         )}
      </div>
   );
};

PinnedTask.propTypes = {
   defaultValue: PropTypes.bool,
   task: PropTypes.object,
   modifyClasses: PropTypes.string,
};

export default PinnedTask;
