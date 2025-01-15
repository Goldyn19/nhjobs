"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SideNav from "./SideNav";
import { IoLocationOutline, IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";


const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const toggleSideNav = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <nav className="bg-white border-b py-5 md:py-5 px-4 md:px-10 shadow-sm">
      {isOpen && (
      <SideNav sidebarToggle={toggleSideNav} sideBarStatus={isOpen} />
      )}
      <div className="container mx-auto h-full flex justify-between items-center">
      <div className="flex items-center">
        <Image
        src="/images/nhlogo.svg"
        alt="new horizons logo"
        height={150}
        width={150}
        className="h-120 w-120 md:h-140 md:w-140"
        />
        <div className="hidden lg:flex space-x-6 ml-10 font-poppins text-sm">
        <Link href="/" className={`${currentPath === "/" ? "text-black bg-gray-300" : ""} hover:text-blue-500 px-2 py-1 rounded-xl transition-colors duration-200 font-semibold`}>Find Jobs</Link>
        <Link href="/messages" className={`${currentPath === "/messages" ? "text-black bg-gray-300" : ""} hover:text-blue-500 px-2 py-1 rounded-xl transition-colors duration-200 font-semibold`}>Messages</Link>
        <Link href="/hiring/newhorizons" className={`${currentPath === "/hiring/newhorizons" ? "text-black bg-gray-300" : ""} hover:text-blue-500 px-2 py-1 rounded-xl transition-colors duration-200 font-semibold`}>Hiring</Link>
        <Link href="/community" className={`${currentPath === "/community" ? "text-black bg-gray-300" : ""} hover:text-blue-500 transition-colors duration-200 px-2 py-1 rounded-xl font-semibold`}>Community</Link>
        <Link href="/FAQ" className={`${currentPath === "/FAQ" ? "text-black bg-gray-300" : ""} hover:text-blue-500 transition-colors duration-200 px-2 py-1 rounded-xl font-semibold`}>FAQ</Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden lg:flex items-center text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors duration-200">
        <IoLocationOutline className="text-gray-700 hover:text-blue-500 text-lg" />
        <span className="ml-2 text-sm font-bold">Lagos, Nigeria</span>
        </div>
        <Link href="/" className="hidden lg:flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-200">
        <IoSettingsOutline className="text-lg" />
        </Link>
        <Link href="/" className="hidden lg:flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-200">
        <IoNotificationsOutline className="text-lg" />
        </Link>
        <Popover>
        <PopoverTrigger className="flex items-center">
          <Image
          src="/images/default_user.png"
          alt="User Avatar"
          height={30}
          width={30}
          className="h-8 w-8 rounded-full bg-black"
          />
        </PopoverTrigger>
        <PopoverContent className="bg-white shadow-lg rounded-lg w-48 flex flex-col p-4">
          <Link href="/" className="text-center text-gray-700 hover:text-blue-500 py-2 transition-colors duration-200">My Profile</Link>
          <hr className="my-2" />
          <Link href="/" className="text-center text-gray-700 hover:text-blue-500 py-2 transition-colors duration-200">Logout</Link>
        </PopoverContent>
        </Popover>
        <button onClick={toggleSideNav} className="lg:hidden text-gray-700 hover:text-blue-500 transition-colors duration-200">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
        </button>
      </div>
      </div>
      <div className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={toggleSideNav} className="absolute top-4 right-4 text-gray-700 hover:text-blue-500 transition-colors duration-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="flex flex-col items-center space-y-4 mt-10">
          <Link href="/" className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-[35px] font-semibold ">Find Jobs</Link>
          <Link  href="/messages" className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-[35px] font-semibold">Messages</Link>
          <Link href="/hiring/newhorizons" className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-[35px] font-semibold">Hiring</Link>
          <Link href="/community" className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-[35px] font-semibold">Community</Link>
          <Link href="/FAQ" className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-[35px] font-semibold">FAQ</Link>
         

          <br />
          <br />

<div  className="flex items-center space-x-4">
          <Link href="/" className="flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-xl font-bold">
        <IoLocationOutline className="text-lg" />
        <span className="ml-2">Lagos, Nigeria</span>
          </Link>
          <Link href="/settings" className="flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-xl font-bold">
        <IoSettingsOutline className="text-lg" />
          </Link>
          <Link href="/notifications" className="flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-xl font-bold">
        <IoNotificationsOutline className="text-lg" />
          </Link>
          </div>

          <br /><br />

          <Image
        src="/images/nhlogo.svg"
        alt="new horizons logo"
        height={150}
        width={150}
        className="h-120 w-120 md:h-140 md:w-140"
        />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;