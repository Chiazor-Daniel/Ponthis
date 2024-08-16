import React from 'react';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const MyLayout = ({ children, title }) => {
  return (
    <>
      <div className='w-full mylayout h-[500px] flex items-center px-10 relative'>
        <div className="overlay"></div>
        <div className='z-10 flex flex-col gap-4'>
            <h1 className='font-bold text-white text-6xl'>{title}</h1>
        <div className='flex gap-2 '> {/* Added z-index to ensure text is above overlay */}
          <p className='text-white font-normal text-xl'>Home</p>
          <MdKeyboardDoubleArrowRight size={30} className='text-orange-500' />
          <p className='text-xl text-orange-500 font-normal'>{title}</p>
        </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default MyLayout;
