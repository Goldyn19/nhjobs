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
    <nav className="bg-white border-b py-5 md:m-0 mx-20">
      {isOpen && (
      <SideNav sidebarToggle={toggleSideNav} sideBarStatus={isOpen} />
      )}
      <div className="container md:mx-auto h-full flex justify-between md:space-x-0 space-x-5">
      <div className="flex items-center ml-10 md:ml-0 md:pl-10">
      <Image
      src="/images/nhlogo.svg"
      alt="new horizons logo"
      height={150}
      width={150}
      className="h-120 w-120"
      />
      <div className="flex space-x-6 ml-20 font-poppins text-[14px]">
      <Link href="/" className={`px-2 py-1 hover:text-blue-500 rounded-xl transition-colors duration-200 ${currentPath === "/" ? "text-black bg-gray-300" : ""}`}>Find Jobs</Link>
        <Link href="/" className={`px-2 py-1 hover:text-blue-500 rounded-xl transition-colors duration-200 ${currentPath === "/messages" ? "text-black bg-gray-300" : ""}`}>Messages</Link>
        <Link href="/hiring/newhorizons" className={`px-2 py-1 hover:text-blue-500 rounded-xl transition-colors duration-200 ${currentPath === "/hiring/newhorizons" ? "text-black bg-gray-300" : ""}`}>Hiring</Link>
        <Link href="/" className={`px-2 py-1 hover:text-blue-500 rounded-xl transition-colors duration-200 ${currentPath === "/community" ? "text-black bg-gray-300" : ""}`}>Community</Link>
        <Link href="/" className={`px-2 py-1 hover:text-blue-500 rounded-xl transition-colors duration-200 ${currentPath === "/FAQ" ? "text-black bg-gray-300" : ""}`}>FAQ</Link>
      </div>
      </div>
      <div className="flex items-center space-x-4">
      <Link href="/" className="flex items-center text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors duration-200">
        <IoLocationOutline className="text-gray-700 hover:text-blue-500 text-[18px]" />
        <span className="ml-2 text-[14px] font-bold">Lagos, Nigeria</span>
      </Link>
      <Link href="/settings" className="flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-200">
        <IoSettingsOutline className="text-[18px]" />
        </Link>
        <Link href="/notifications" className="flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-200">
        <IoNotificationsOutline className="text-[18px]" />
        </Link>
      <Popover>
      <PopoverTrigger className="flex items-center mr-10 md:mr-0 md:pr-10">
      <Image
      src="/images/default_user.png"
      alt=""
      height={10}
      width={10}
      className="h-5 w-5 rounded-full bg-black"
      />
      </PopoverTrigger>
      <PopoverContent className="bg-white shadow-lg rounded-lg w-[200px] flex flex-col p-4 mr-10 md:mr-0 md:pr-10">
        <Link href="/" className="text-center text-gray-700 hover:text-blue-500 py-2 transition-colors duration-200">My Profile</Link>
        <hr className="my-2" />
        <Link href="/" className="text-center text-gray-700 hover:text-blue-500 py-2 transition-colors duration-200">Logout</Link>
      </PopoverContent>
      </Popover>

    
      </div>
      </div>
    </nav>
  );
};

export default TopNav;