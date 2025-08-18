"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-500">
        Loading profile...
      </div>
    );
  }

  const user = session?.user;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-white py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex items-center gap-6">
          <Image
            src={user?.image || "/mine.png"}
            alt="User avatar"
            width={90}
            height={90}
            className="rounded-full object-cover border"
          />
          <div>
            <h1 className="text-2xl font-bold text-indigo-800">
              {user?.name || "No name"}
            </h1>
            <p className="text-gray-600">{user?.email || "No email"}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-indigo-700">
            Profile Details
          </h2>
          <div className="grid gap-4 text-gray-700">
            <p>
              <span className="font-medium">Full Name:</span>{" "}
              {user?.name || "N/A"}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user?.email || "N/A"}
            </p>
            <p>
              <span className="font-medium">Member since:</span> 2025 (static)
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
