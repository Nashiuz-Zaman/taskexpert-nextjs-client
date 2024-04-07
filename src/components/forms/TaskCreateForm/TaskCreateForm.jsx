'use client';

// shared components
import ButtonBtn from '../../buttons/ButtonBtn/ButtonBtn';
import CloseBtn from '@/components/buttons/CloseBtn/CloseBtn';
import SelectField from '@/components/shared/SelectField/SelectField';
import InputField2 from '@/components/shared/InputField2/InputField2';
import TextareaField from './../../shared/TextareaField/TextareaField';

// custom hooks
import useTaskDatabaseMethods from '@/hooks/useTaskDatabaseMethods';
import useEscapeClose from '../../../hooks/useEscapeClose';
import useFormVisiblity from '@/hooks/useFormVisiblity';
import useClickOutside from '@/hooks/useClickOutside';

// redux
import useRedux from '@/hooks/useRedux';

// utils
import { validateTaskData } from '@/utils/validateTaskData';

// data
import { priorityOptions } from '@/uiData/formsUiData';
import { setTaskCreateErrors } from '@/lib/redux/features/task/taskSlice';

const TaskCreateForm = () => {
   const { dispatch, useSelector } = useRedux();
   const { profileData } = useSelector(store => store.auth);
   const { taskCreateFormOpen } = useSelector(store => store.form);
   const { taskCreateErrors } = useSelector(store => store.task);
   const { createTask } = useTaskDatabaseMethods();
   const { closeTaskCreateForm } = useFormVisiblity();

   const handleClickOutside = e => {
      if (!e.target.closest('.task-create-form-focus')) {
         closeTaskCreateForm();
      }
   };

   // add support clicking out side and escape key press
   useEscapeClose(closeTaskCreateForm);
   useClickOutside(taskCreateFormOpen, handleClickOutside);

   const handleCreateTask = e => {
      e.preventDefault();
      dispatch(setTaskCreateErrors([]));

      // take all the necessary values
      const form = e.target;
      const title = form.title.value;
      const description = form.description.value;
      const deadline = form.deadline.value && new Date(form.deadline.value).toISOString();
      const priorityLevel = parseInt(form.priority.value);
      const date = new Date().toISOString();

      // Task data
      const taskData = {
         title,
         description,
         statusLevel: 0,
         deadline,
         priorityLevel,
         lastUpdated: date,
         email: profileData.email,
      };

      // check for errors in the task data
      const foundErrors = validateTaskData(taskData);
      if (foundErrors.length > 0) {
         dispatch(setTaskCreateErrors(foundErrors));
         return;
      }

      createTask(taskData);
      closeTaskCreateForm();
      form.reset();
   };

   return (
      <div
         className={`${
            taskCreateFormOpen ? 'block' : 'hidden'
         } translate-x-4 md:translate-x-8 shadow-md w-[16rem] xs:w-[19rem] absolute top-0 translate-y-[3.2rem] md:translate-y-[3.7rem] left-0 p-4 bg-white border border-neutral-300 z-40 rounded-xl task-create-form-focus`}
      >
         <CloseBtn
            onClickFunction={closeTaskCreateForm}
            modifyClasses='!text-xl'
         />

         {/* form starts here */}
         <form
            noValidate
            onSubmit={handleCreateTask}
            className='block space-y-3'
         >
            {/* title */}
            <InputField2
               label='Title'
               maxLength={50}
               name='title'
               placeholder='Task Title'
            />

            {/* description */}
            <TextareaField
               label='Description'
               name='description'
               placeholder='Task Description'
            />

            {/* deadline */}
            <InputField2 label='Deadline' type='date' name='deadline' />

            {/* priority */}
            <SelectField
               label='Priority'
               name='priority'
               options={priorityOptions}
               defaultValueData={0}
            />

            {/* show errors here */}
            {taskCreateErrors?.length > 0 && (
               <div className='space-y-1 mt-3 md:mt-4'>
                  {taskCreateErrors.map(error => {
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
            <ButtonBtn text='Add Task' modifyClasses='!ml-auto !mt-5' />
         </form>
      </div>
   );
};

export default TaskCreateForm;
