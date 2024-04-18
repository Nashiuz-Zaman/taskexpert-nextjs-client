'use client';

// react
import PropTypes from 'prop-types';

// components
import { FilterBtn, SortBtn, AddBtn } from '@/components/buttons';
import { Searchbar, MenuPanel } from '@/components/shared';
import { FilterForm, SortForm } from '@/components/forms';

// hook
import { useFormVisiblity, useRedux } from '@/hooks';

// redux
import { setSearchTerm } from '@/lib/redux/features/search/searchSlice';
import { setTaskFilterParams } from '@/lib/redux/features/filter/filterSlice';
import { setPrioritySortParam } from '@/lib/redux/features/sort/sortSlice';

// data
import { priorityOptions, sortByPriorityOptions } from '@/uiData/formsUiData';

const TaskUtilsHeader = ({ modifyClasses = '' }) => {
   const { dispatch, useSelector } = useRedux();
   const { taskFilterParams } = useSelector(store => store.filter);
   const { prioritySortParam } = useSelector(store => store.sort);
   const { openTaskCreateForm } = useFormVisiblity();

   const handleSearchChange = e => {
      dispatch(setSearchTerm(e.target.value.toLowerCase()));
   };

   return (
      <div
         className={`grid grid-cols-1 xs:grid-cols-[1fr_max-content] gap-2 md:gap-4 items-center bg-white py-2 md:py-4 px-4 md:px-8 ${modifyClasses}`}
      >
         {/* add, filter, search */}
         <div className='flex items-center'>
            <AddBtn
               onClickFunction={openTaskCreateForm}
               text='Create Task'
               modifyClasses='!bg-primary !border-primary hover:!bg-primaryLight hover:!border-primaryLight !text-white !rounded-xl'
            />

            <FilterBtn
               renderChildren={(show, setShow) => {
                  return (
                     <MenuPanel
                        show={show}
                        setShow={setShow}
                        modifyClasses='!top-auto !bottom-0 !translate-y-[calc(100%+4px)] !w-[10rem] !p-4 !space-y-0'
                     >
                        <p className='text-lg font-bold mb-2'>By priority</p>
                        <FilterForm
                           params={priorityOptions}
                           curCheckedParams={taskFilterParams}
                           setCurCheckedParams={setTaskFilterParams}
                        />
                     </MenuPanel>
                  );
               }}
               modifyClasses='!rounded-xl ml-auto mr-2'
            />

            <SortBtn
               modifyClasses='!rounded-xl'
               renderChildren={(show, setShow) => {
                  return (
                     <MenuPanel
                        show={show}
                        setShow={setShow}
                        modifyClasses='!top-auto !bottom-0 !translate-y-[calc(100%+4px)] !w-[12rem] !p-4 !space-y-0'
                     >
                        <p className='text-lg font-bold mb-2'>By priority</p>
                        <SortForm
                           params={sortByPriorityOptions}
                           curCheckedParam={prioritySortParam}
                           setCurCheckedParam={setPrioritySortParam}
                        />
                     </MenuPanel>
                  );
               }}
            />
         </div>

         {/* search */}

         <Searchbar
            onChangeFunction={handleSearchChange}
            modifyClasses='!rounded-xl !w-full xs:!w-[15rem] justify-self-center md:justify-self-end'
         />
      </div>
   );
};

TaskUtilsHeader.propTypes = {
   modifyClasses: PropTypes.string,
};

export default TaskUtilsHeader;
