// react
import PropTypes from 'prop-types';

// components
import InnerContainer from '@/components/containers/InnerContainer/InnerContainer';
import LinkList from '@/components/shared/LinkList/LinkList';

// react icons
import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa6';

// data
import { footerOptions, currentYear } from '../../../uiData/footerData';
import { BrandLogo } from '../BrandLogo/BrandLogo';

const Footer = () => {
  // common classes
  const socialLinksClasses =
    'text-4xl text-white hover:text-primary transition-all duration-150 cursor-pointer';

  return (
    <footer className='bg-blackLight pt-sectionGapSm md:pt-sectionGapMd pb-16 relative'>
      <InnerContainer>
        {/* top part */}

        {/* address and links */}
        <div className='mb-14 grid grid-cols-1 md:grid-cols-3'>
          {/* website logo */}
          <BrandLogo
            theme='dark'
            modifyClasses='mx-auto mb-sectionGapSm lg:h-[3rem]'
          />

          {/* list of links */}
          <div className='justify-self-center mb-14 text-center md:text-left'>
            <LinkList linksData={footerOptions} />
          </div>

          {/* follow us social media */}
          <div className='justify-self-center'>
            {/* social media icons */}
            <div>
              <h2 className='text-xl text-center md:text-left text-white mb-3 2xl:text-3xl font'>
                Follow Us
              </h2>

              {/* social media icons */}
              <div className='text-white text-2xl flex items-center gap-4'>
                <a
                  className={socialLinksClasses}
                  href='https://www.facebook.com'
                >
                  <FaFacebook />
                </a>
                <a
                  className={socialLinksClasses}
                  href='https://www.twitter.com'
                >
                  <FaXTwitter />
                </a>
                <a
                  className={socialLinksClasses}
                  href='https://www.instagram.com'
                >
                  <FaInstagram />
                </a>
                <a
                  className={socialLinksClasses}
                  href='https://www.youtube.com'
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* copyright part */}
        <div className='text-center'>
          <small className='text-white 2xl:text-lg'>
            &copy; {currentYear} Task Expert Inc., Developed by Nashiuz Zaman
          </small>
        </div>
      </InnerContainer>
    </footer>
  );
};

Footer.propTypes = {
  addressData: PropTypes.object,
};

export default Footer;
