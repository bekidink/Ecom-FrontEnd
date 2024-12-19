"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const text = searchParams.get("text"); // Extract a specific query parameter, if any.

  return (
    <div className="m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5">
      <p className="text-green-800 font-bold text-lg text-center">
        {text ? text : "Payment"} Successfully
      </p>
      <Link
        href="/"
        className="border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1"
      >
        Go To Home
      </Link>
    </div>
  );
};

const Success = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SuccessContent />
  </Suspense>
);

export default Success;
