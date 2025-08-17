"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== "undefined" && window.history.length > 2) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-around w-screen min-h-screen bg-white px-4">
      <div className="text-center md:text-left mb-8 md:mb-0">
        <h1 className="text-[60px] m-5">Oops...</h1>
        <p className="text-3xl text-slate-600 font-[600]">Page not found</p>
        <h3 className="my-2 font-[400] text-slate-500">Message</h3>
        <button
          onClick={handleClick}
          className="border bg-blue-100 border-blue-600 text-blue-700 font-[550] px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300"
        >
          Go Back
        </button>
      </div>

      <div className="rounded-[36px] shadow-lg max-w-4xl w-full">
        <img
          className="w-full h-auto rounded-[36px]"
          src="https://cdn.mos.cms.futurecdn.net/PuXipAW3AXUzUJ4uYyxPKC.jpg"
          alt="404 Error"
        />
      </div>
    </div>
  );
}
