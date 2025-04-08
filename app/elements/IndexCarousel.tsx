import React from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // optional, if you're using Next.js

const items = [
  "/images/amazon-text.png",
  "/public/images/google-text.jpg",
  "/public/images/tesla-text.png",
  "/public/images/microsoft-text.jpg",
  "/public/images/meta-text.png",
  "/public/images/netflix-text.png",
];

const indexCarosel = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full relative py-4 bg-gray-100">
    <motion.div
      className="flex gap-4"
      animate={{ x: ["0%", "-100%"] }}
      transition={{
        repeat: Infinity,
        duration: 20,
        ease: "linear",
      }}
    >
      {[...items, ...items].map((src, index) => (
        <div key={index} className="min-w-[200px] h-[150px] bg-white rounded-lg shadow-md overflow-hidden">
          <Image
            width={200}
            height={150}
            src={src}
            alt={`item-${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  </div>
  )
}

export default indexCarosel
