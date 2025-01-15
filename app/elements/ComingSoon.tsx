import React from "react";
import Image from "next/image";
const ComingSoon = () => {
  return (
    <div className="h-full max-w-screen-lg md:mt-10 mx-auto">
      <div className="flex">
        <div>
          <Image
            src={`/images/coming-soon.png`}
            alt=""
            width={500}
            height={150}
          />
        </div>
        <div className="flex  items-center">
          <div className="text-center">
            <h1 className="text-nhBlue-200 text-[36px] tracking-widest font-bold text-center">
              Coming Soon!
            </h1>
            <h4 className="text-nhBlue-200 text-[24px]">
              We are currently working on this section 
            </h4>
            <h4 className="text-nhBlue-200 text-[24px]">
              Kindly vist another time
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
