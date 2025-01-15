import React from "react";
import ComingSoon from "../elements/ComingSoon";
import TopNav from "../elements/TopNav";
const page = () => {
  return (
    <div>
      <div className="h-screen overflow-clip">
        <TopNav />
        <ComingSoon />
      </div>
    </div>
  );
};

export default page;
