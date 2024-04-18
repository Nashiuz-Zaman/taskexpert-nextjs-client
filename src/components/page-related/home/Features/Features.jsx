// components
import Feature from './Feature/Feature';

// data
import { featuresContent } from '@/uiData/homeUiContent';

const Features = () => {
   const { features } = featuresContent;

   return (
      <>
         <h2
            className={`text-2xl !leading-snug font-bold 2md:text-3xl xl:text-4xl 3xl:text-5xl md:col-span-2 mb-8 md:mb-10 text-center `}
         >
            Our <span className='text-primary'>Features</span>.
         </h2>

         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 xl:gap-12'>
            {features?.map(feature => {
               return <Feature key={feature.id} featureData={feature} />;
            })}
         </div>
      </>
   );
};

export default Features;
