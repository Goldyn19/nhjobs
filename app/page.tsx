"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SideNav from "./elements/SideNav";
import {
  IoLocationOutline,
  IoSettingsOutline,
  IoNotificationsOutline,
} from "react-icons/io5";

import { usePathname } from "next/navigation";

export default function Home() {
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
    <div>
      <section
        className=""
        style={{
          backgroundImage: "url('/images/landing-bg.jpg')",
          backgroundSize: "cover", // or 'contain' based on your need
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <nav className="bg-transparent border-b py-5 md:py-5 px-4 md:px-10 shadow-sm text-white">
          {isOpen && (
            <SideNav sidebarToggle={toggleSideNav} sideBarStatus={isOpen} />
          )}
          <div className="container mx-auto h-full flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/images/nh-logo-white.png"
                alt="new horizons logo"
                height={220}
                width={220}
                className="h-150 w-150 md:h-140 md:w-140 mt-2"
              />
            </div>
            <div className="hidden lg:flex space-x-2 ml-14 font-poppins text-sm">
              <Link
                href="/"
                className={`${
                  currentPath === "/" ? "text-black bg-gray-300" : ""
                } hover:text-blue-500 px-4 py-1 rounded-[10px] transition-colors duration-200 font-semibold`}
              >
                Home
              </Link>
              <Link
                href="/messages"
                className={`${
                  currentPath === "/messages" ? "text-black bg-gray-300" : ""
                } hover:text-blue-500 px-4 py-1 rounded-[10px] transition-colors duration-200 font-semibold`}
              >
                About
              </Link>
              <Link
                href="/hiring/newhorizons"
                className={`${
                  currentPath === "/hiring/newhorizons"
                    ? "text-black bg-gray-300"
                    : ""
                } hover:text-blue-500 px-4 py-1 rounded-[10px] transition-colors duration-200 font-semibold`}
              >
                Features
              </Link>
              <Link
                href="/community"
                className={`${
                  currentPath === "/community" ? "text-black bg-gray-300" : ""
                } hover:text-blue-500 transition-colors duration-200 px-4 py-1 rounded-[10px] font-semibold`}
              >
                Resources
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <button className="py-2 px-4 hidden md:block">Sign In</button>
              </Link>
              <Link href="/signup">
                <button className="py-2 px-4 bg-nhOrange-100 text-white rounded-xl hidden md:block">
                  Sign Up
                </button>
              </Link>
              <button
                onClick={toggleSideNav}
                className="lg:hidden text-gray-700 hover:text-blue-500 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div
            className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={toggleSideNav}
              className="absolute top-4 right-4 text-gray-700 hover:text-blue-500 transition-colors duration-500"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="flex flex-col items-center space-y-4 mt-10">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-[35px] font-semibold "
              >
                Find Jobs
              </Link>
              <Link
                href="/messages"
                className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-[35px] font-semibold"
              >
                Messages
              </Link>
              <Link
                href="/hiring/newhorizons"
                className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-[35px] font-semibold"
              >
                Hiring
              </Link>
              <Link
                href="/community"
                className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-[35px] font-semibold"
              >
                Community
              </Link>
              <Link
                href="/FAQ"
                className="text-gray-700 hover:text-blue-500 transition-colors duration-200 text-[35px] font-semibold"
              >
                FAQ
              </Link>

              <br />
              <br />

              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-xl font-bold"
                >
                  <IoLocationOutline className="text-lg" />
                  <span className="ml-2">Lagos, Nigeria</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-xl font-bold"
                >
                  <IoSettingsOutline className="text-lg" />
                </Link>
                <Link
                  href="/notifications"
                  className="flex items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-xl font-bold"
                >
                  <IoNotificationsOutline className="text-lg" />
                </Link>
              </div>

              <br />
              <br />

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
        <div className="text-white pb-24">
          <div className="flex justify-center flex-col mx-auto ">
            <div className="flex flex-col justify-center mx-auto max-w-2xl mt-[80px]">
              <h1 className="text-center text-5xl font-bold leading-[60px]">
                Find Your Next Gig With Our <br /> Freelance Job Platform
              </h1>
              <p className="text-center mt-5">
                Streamline yor freelance business with our job finder platform.
                Find opportunities, manage workloads, and maximize earnings
              </p>
              <div className="flex justify-center mt-10 space-x-6 mb-[30px]">
                <Link href="/login">
                  <button className="py-2 px-4 hidden md:block bg-slate-500 rounded-xl">Sign In</button>
                </Link>
                <Link href="/signup">
                  <button className="py-2 px-4 bg-nhOrange-100 text-white rounded-xl hidden md:block">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
            <Image
              src="/images/full-screenshot.png"
              alt="screenshot of job portal"
              className="mx-auto lg:block hidden rounded-md"
              height={1000}
              width={1200}
            />
          </div>
        </div>
      </section>
      <section>
        
      </section>
    </div>
  );
}
