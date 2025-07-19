import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to MineApp!</h1>
      <p className="mt-4 text-lg">
        Your journey into the world of mining starts here.
      </p>
      <a href ="/users" className="mt-6 text-blue-500 hover:underline">Users</a>
      <a href ="/mines" className="mt-2 text-blue-500 hover:underline">Mines</a>
      <a href ="/mining" className="mt-2 text-blue-500 hover:underline">Mining</a>
      <a href ="/transactions" className="mt-2 text-blue-500 hover:underline">Transactions</a>
    </main>
  );
}
