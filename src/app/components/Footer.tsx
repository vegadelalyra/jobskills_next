import React from 'react';
import Image from 'next/image';
import { BiWorld } from 'react-icons/bi';
import { FiUser } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className='bg-black h-16 w-full flex justify-center items-center relative'>
      {/* Container for superpositioned icons */}
      <div className='border-red absolute inset-0 flex justify-around items-center'>
        {/* Community Icon */}
        <div className='flex flex-col items-center cursor-pointer w-16'>
          <BiWorld size={28} />
          <span className='text-white text-xs'>Community</span>
        </div>
        {/* Me Icon */}
        <div className='flex flex-col items-center cursor-pointer w-16'>
          <FiUser size={28} />
          <span className=' text-white text-xs'>Me</span>
        </div>
      </div>
      {/* Plus icon centered within the footer */}
      <div className='z-index-1 relative bottom-1 flex justify-center items-center cursor-pointer'>
        <Image src='/plus.svg' alt='Add' width={50} height={60} />
      </div>
    </footer>
  );
};

export default Footer;
