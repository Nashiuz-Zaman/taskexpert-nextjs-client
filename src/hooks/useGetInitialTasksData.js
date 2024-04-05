'use client';

// react
import { useEffect } from 'react';

// hooks
import useAxios from './useAxios';

// redux
import useRedux from './useRedux';
import {
   setTotalTasks,
   setIsLoading,
   setPinnedTasks,
} from '@/lib/redux/features/task/taskSlice';

const useGetInitialTasksData = () => {
   const { dispatch, useSelector } = useRedux();
   const { profileData } = useSelector(store => store.auth);
   const { axiosSecure } = useAxios();

   useEffect(() => {
      const getInitialTasks = async email => {
         dispatch(setIsLoading(true));

         const totalTasksPromise = axiosSecure.get(`/tasks?email=${email}`);
         const pinnedTasksPromise = axiosSecure.get(
            `/pinned-tasks?email=${email}`
         );

         const [totalTasksRes, pinnedTasksRes] = await Promise.all([
            totalTasksPromise,
            pinnedTasksPromise,
         ]);

         if (totalTasksRes.data.status === 'success') {
            dispatch(setTotalTasks(totalTasksRes.data.tasks));
         }

         if (pinnedTasksRes.data.status === 'success') {
            dispatch(setPinnedTasks(pinnedTasksRes.data.pinnedTasks));
         }
         dispatch(setIsLoading(false));
      };

      if (profileData?.email) {
         getInitialTasks(profileData.email);
      }
   }, [profileData, dispatch, axiosSecure]);
};

export default useGetInitialTasksData;
