// react imports
import PropTypes from 'prop-types';

// next
import Link from 'next/link';
import Image from 'next/image';

// data
import logoPrimary from '@/assets/websiteLogo/logo-primary.webp';
import logoWhite from '@/assets/websiteLogo/logo-white.webp';

const BrandLogo = ({
   onClickFunction = null,
   modifyClasses = '',
   theme = 'light',
}) => {
   return (
      <Link
         onClick={onClickFunction}
         className={`block w-max h-8 md:h-10 xl:h-14 ${modifyClasses}`}
         href='/'
      >
         <Image
            width={500}
            height={200}
            priority={true}
            src={theme === 'light' ? logoPrimary : logoWhite}
            alt='Company Logo'
            className='block w-auto h-[inherit]'
            quality={100}
            
         />
      </Link>
   );
};

BrandLogo.propTypes = {
   onClickFunction: PropTypes.func,
   modifyClasses: PropTypes.string,
   theme: PropTypes.string,
};

export default BrandLogo;
