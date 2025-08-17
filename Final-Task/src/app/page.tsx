import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center px-2 my-10 sm:mx-5">
      <Link href="/opportunities">
        <button className="px-3 py-1 text-xl text-white font-semibold bg-indigo-900 rounded-xl hover:bg-blue-100">
          Start Exploring
        </button>
      </Link>
    </div>
  );
}
