'use client';

// react
import { useEffect, useCallback } from 'react';

// components
import RegistrationFormWithImage from '../RegistrationFormWithImage/RegistrationFormWithImage';

// hooks
import useClickOutside from '@/hooks/useClickOutside';
import useFormVisiblity from '@/hooks/useFormVisiblity';
import useStopScrolling from '@/hooks/useStopScrolling';

// redux
import { useSelector } from 'react-redux';

// data
import registrationImg from './../../../assets/forms/registration.webp';

const RegistrationModal = () => {
   const { registrationFormOpen } = useSelector(store => store.form);
   const { closeSignupFormWithBackdrop } = useFormVisiblity();
   const { stopYAxisScrolling } = useStopScrolling();

   useEffect(() => {
      stopYAxisScrolling(registrationFormOpen);
   }, [registrationFormOpen, stopYAxisScrolling]);

   const handleClickOutside = useCallback(
      e => {
         if (
            e.target.closest('.registration-custom-focus') ||
            e.target.tagName.toLowerCase() === 'svg' ||
            e.target.tagName.toLowerCase() === 'path'
         ) {
            return;
         }

         closeSignupFormWithBackdrop();
      },
      [closeSignupFormWithBackdrop]
   );
   useClickOutside(registrationFormOpen, handleClickOutside);

   return (
      <div
         className={`fixed w-full z-40 transition-all duration-default opacity-0 collapse top-1/2 left-1/2 -translate-y-full -translate-x-1/2 ${
            registrationFormOpen
               ? '!opacity-100 !visible !-translate-y-1/2'
               : ''
         }`}
      >
         <RegistrationFormWithImage imageSource={registrationImg} />
      </div>
   );
};

export default RegistrationModal;
