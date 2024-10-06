import React from "react";

const Summarycard = ({ summary }: any) => {
  console.log(summary);
  return (
    <div className="w-1/2  p-4 py-2 m-4  border border-gray-500 rounded-lg shadow-lg ">
      <div className="border-b py-3">Date: {summary.createdAt}</div>
      <div className="py-2">{summary.content}</div>
    </div>
  );
};

export default Summarycard;
