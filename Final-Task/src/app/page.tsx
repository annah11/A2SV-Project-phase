import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center">
      <section className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-indigo-900 mb-4 font-serif">
          Welcome to the Final Task!
        </h1>

        <Link href="/opportunities" passHref>
          <button
            className="px-6 py-3 text-lg font-semibold text-white bg-indigo-900 rounded-xl shadow hover:bg-indigo-800 transition duration-200"
            data-id="get-started-btn"
          >
            🚀 Start Exploring
          </button>
        </Link>
        <div className="mt-8 flex flex-col items-center gap-2"></div>
        <h1 className="text-lg font-light text-gray-200">By annha11</h1>
      </section>
    </main>
  );
}
