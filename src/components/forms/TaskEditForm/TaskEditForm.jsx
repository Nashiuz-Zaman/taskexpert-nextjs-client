'use client';

// shared components
import ButtonBtn from '../../buttons/ButtonBtn/ButtonBtn';
import CloseBtn from '@/components/buttons/CloseBtn/CloseBtn';
import InputField2 from '@/components/shared/InputField2/InputField2';
import TextareaField from '@/components/shared/TextareaField/TextareaField';
import SelectField from '@/components/shared/SelectField/SelectField';

// custom hooks
import useTaskDatabaseMethods from '@/hooks/useTaskDatabaseMethods';
import useEscapeClose from '../../../hooks/useEscapeClose';
import useFormVisiblity from '@/hooks/useFormVisiblity';

// redux
import useRedux from '@/hooks/useRedux';
import {
   setTaskToEdit,
   setTaskEditErrors,
} from '@/lib/redux/features/task/taskSlice';

// utils
import { getDateInYYYYMMDD } from '@/utils/dateTimeMethods';
import { validateTaskData } from '@/utils/validateTaskData';

// data
import { priorityOptions } from '@/uiData/formsUiData';

const TaskEditForm = () => {
   const { dispatch, useSelector } = useRedux();
   const { taskEditFormOpen } = useSelector(store => store.form);
   const { taskToEdit, totalTasks, taskEditErrors } = useSelector(
      store => store.task
   );
   const { closeTaskEditForm } = useFormVisiblity();
   const { editTask } = useTaskDatabaseMethods();

   // close form and reset the taskToEdit state
   const handleCloseForm = () => {
      closeTaskEditForm();
      dispatch(setTaskToEdit(null));
   };

   // add support clicking outside and escape key press
   useEscapeClose(handleCloseForm);

   // all form values come from their inputs but date comes from the state
   const handleEditTask = e => {
      e.preventDefault();
      dispatch(setTaskEditErrors([]));

      // take all the necessary values
      const form = e.target;
      const title = form.title.value.trim();
      const description = form.description.value.trim();
      const deadline =
         form.deadline.value && new Date(form.deadline.value).toISOString();
      const priorityLevel = parseInt(form.priority.value.trim());

      // Task data summarized
      const editedTaskData = {
         title,
         description,
         deadline,
         priorityLevel,
      };

      // check for errors in the task data
      const foundErrors = validateTaskData(editedTaskData);
      if (foundErrors.length > 0) {
         dispatch(setTaskEditErrors(foundErrors));
         return;
      }

      editTask(taskToEdit._id, editedTaskData, totalTasks);
      handleCloseForm();
      form.reset();
   };

   return (
      <div
         className={`${
            taskEditFormOpen ? 'opacity-100 visible' : 'opacity-0 collapse'
         } transition-all !duration-default shadow-small w-[90%] 2xs:w-[20rem] md:w-[30rem] border border-neutral-300 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-4 bg-white z-40 rounded-xl task-edit-form-focus`}
      >
         <CloseBtn onClickFunction={handleCloseForm} modifyClasses='!text-xl' />

         {/* form starts here */}
         <form noValidate onSubmit={handleEditTask} className='block space-y-3'>
            {/* title */}
            <InputField2
               defaultValueData={taskToEdit?.title}
               label='Title'
               name='title'
               maxLength={50}
               placeholder='Task Title'
            />

            {/* description */}
            <TextareaField
               defaultValueData={taskToEdit?.description}
               label='Description'
               name='description'
               placeholder='Task Description'
            />

            {/* deadline */}
            <InputField2
               defaultValueData={
                  taskToEdit && getDateInYYYYMMDD(taskToEdit.deadline)
               }
               type='date'
               label='Deadline'
               name='deadline'
            />

            {/* priority */}
            <SelectField
               label='Priority'
               name='priority'
               options={priorityOptions}
               defaultValueData={taskToEdit?.priorityLevel}
            />

            {/* show errors here */}
            {taskEditErrors?.length > 0 && (
               <div className='space-y-1 mt-3 md:mt-4'>
                  {taskEditErrors.map(error => {
                     return (
                        <p
                           key={error}
                           className='text-sm text-center font-semibold text-red-600'
                        >
                           * {error}
                        </p>
                     );
                  })}
               </div>
            )}

            {/* submit button */}
            <ButtonBtn text='Save' modifyClasses='!ml-auto !mt-5' />
         </form>
      </div>
   );
};

export default TaskEditForm;
