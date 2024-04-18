// components
import { SectionHeading, PhotoGallery2 } from '@/components/shared';

// data
import { targetAudienceTextContent } from '@/uiData/homeUiContent';

const TargetAudience = () => {
   const { images, heading, subheading, description } =
      targetAudienceTextContent;

   return (
      <div>
         {/* heading */}
         <SectionHeading
            text={heading}
            modifyClasses='text-center !font-extrabold mb-11'
         />

         <PhotoGallery2 imagesData={images} modifyClasses='mb-16' />

         {/* subheading */}
         <p className='font-semibold text-3xl text-center mb-4 text-primary'>
            {subheading}
         </p>

         {/* description */}
         <p className='w-full md:w-[80%] lg:w-[60%] lg:text-xl font-medium mx-auto text-center leading-[1.6] mb-11'>
            {description}
         </p>
      </div>
   );
};

export default TargetAudience;
