'use client';

// axios
import axios from 'axios';

// hooks
import useFirebaseMethods from './useFirebaseMethods';
import useRedux from './useRedux';

// redux
import {
   setProfileData,
   setUserShouldExist,
} from '@/lib/redux/features/auth/authSlice';

// server url
import { serverUrl } from '@/uiData/serverUrl';
import { showToast } from '@/utils/toastify';

const axiosPublic = axios.create({
   baseURL: serverUrl,
   withCredentials: true
});

const axiosSecure = axios.create({
   baseURL: serverUrl,
});

const useAxios = () => {
   const { logout } = useFirebaseMethods();
   const { dispatch } = useRedux();

   // request
   axiosSecure.interceptors.request.use(
      config => {
         const token = localStorage.getItem('token');
         if (token) {
            config.headers.authorization = `Bearer ${token}`;
         }
         return config;
      },
      error => {
         return Promise.reject(error);
      }
   );

   // response

   axiosSecure.interceptors.response.use(
      response => {
         return response;
      },
      async error => {
         const statusCode = error.response.status;

         if (statusCode === 401 || statusCode === 403) {
            const res = await logout();

            if (res.status === 'success') {
               const logoutRes = await axios.patch(`${serverUrl}/logout`, {
                  email: localStorage.getItem('email'),
               });

               if (logoutRes.data.status === 'success') {
                  dispatch(setProfileData(null));
                  dispatch(setUserShouldExist(false));
                  localStorage.removeItem('token');
                  localStorage.removeItem('email');

                  showToast(
                     'You Were Signed Out, Please Sign In Again',
                     'error'
                  );
               }
            }

            return;
         }

         return Promise.reject(error);
      }
   );

   return { axiosPublic, axiosSecure };
};

export default useAxios;
