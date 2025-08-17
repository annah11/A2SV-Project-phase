import Button from "../Buttons/Button";
import { JobPost } from "@/type/type";
import Image from "next/image";
import Bookmark from "../Bookmark/Bookmarks";
import Link from "next/link";

function JobCard({ data }: { data: JobPost }) {
  return (
    <div className="flex flex-col sm:flex-row py-4 px-2 sm:px-4 md:px-8 border-2 rounded-[30px] space-y-2 sm:space-y-0 sm:space-x-4 my-3 mx-auto items-start bg-white transition-shadow hover:shadow-lg">
      {/* Company Logo */}
      <div className="w-[60px] h-[60px] flex-shrink-0 my-1 mx-auto sm:mx-0">
        <Link href={`/opportunities/${data.id}`}>
          <Image
            src={data.logoUrl || "/assets/job1.png"}
            alt={`${data.orgName || "Company"} logo`}
            width={60}
            height={60}
            className="block object-cover w-full h-full rounded-full"
          />
        </Link>
      </div>

      {/* Job Info */}
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start">
          <Link href={`/opportunities/${data.id}`}>
            <h1 className="text-base sm:text-lg font-semibold text-slate-800 line-clamp-2 hover:underline">
              {data.title}
            </h1>
          </Link>
          <Bookmark id={data.id} bookmarked={data.isBookmarked} />
        </div>

        <h3 className="text-xs sm:text-sm text-slate-500 font-epilogue">
          {data.location.join(", ")}
        </h3>

        <p className="text-sm sm:text-base font-medium text-justify font-epilogue text-slate-700 line-clamp-3">
          {data.description}
        </p>

        {/* Tags and Views */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {data.opType && (
            <Button
              background="bg-green-100"
              border=""
              text="text-green-400"
              value={data.opType}
            />
          )}

          {data.categories &&
            data.categories.map((cat, idx) => (
              <Button
                key={idx}
                background="bg-slate-50"
                border="border border-amber-400"
                text="text-yellow-500"
                value={cat}
              />
            ))}
          <Button
            background="bg-[#4640DE]/20"
            border="border border-[#4640DE]"
            text="text-[#4640DE]"
            value="IT"
          />

          {/* Views */}
          <div className="flex items-center text-slate-800 ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="w-5 h-5 mr-1 text-sky-900"
              fill="currentColor"
            >
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
            </svg>
            <span className="text-sm font-medium">{data.viewsCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
