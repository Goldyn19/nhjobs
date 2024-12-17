import React from 'react'
import { IoIosClose } from "react-icons/io";

interface SideNavProps {
    sideBarStatus: boolean;
    sidebarToggle: () => void;
}
const SideNav: React.FC<SideNavProps> = ({sidebarToggle, sideBarStatus}) => {
  return (
    <aside className={`${!sideBarStatus ? '-translate-x-full' : ''} fixed md:hidden block top-0 left-0 z-40 bg-nhBlue-200 w-64 h-screen pt-20 transition-transform delay-500 border-r  sm:translate-x-0`}>
        <IoIosClose className='absolute text-gray-600 w-8 h-8 top-2 right-4' onClick={sidebarToggle}/>

        <div className='h-full px-3 pb-4 overflow-y-auto flex-col justify-center'>
            <ul className='space-y-4'></ul>
        </div>
    </aside>
  )
}

export default SideNav
