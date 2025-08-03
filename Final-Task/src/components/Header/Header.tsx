"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import SelectSortedBy from "../SelectSortedBy/SelectSortedBy";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { ChevronDown, LogOut, User, Bookmark } from "lucide-react";

export default function Header({ count }: { count: number }) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <motion.header
      className="w-full px-4 sm:px-8 py-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-1">
            Opportunities
          </h1>
          <p className="text-md text-slate-500">Showing {count} results</p>
          {user?.name && (
            <p className="mt-2 text-md text-indigo-700 font-medium">
              Welcome, <span className="font-semibold">{user.name}</span> 👋
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 font-medium">
              Sorted by:
            </span>
            <SelectSortedBy />
          </div>

          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow hover:shadow-md transition border">
                <img
                  src={user.image || "/mine.png"}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown size={16} className="text-slate-600" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-xl shadow-lg focus:outline-none z-50">
                  <div className="p-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/profile"
                          className={`${
                            active ? "bg-indigo-100" : ""
                          } group flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 rounded-lg`}
                        >
                          <User size={16} /> Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/bookmarks"
                          className={`${
                            active ? "bg-indigo-100" : ""
                          } group flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 rounded-lg`}
                        >
                          <Bookmark size={16} /> My Bookmarks
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className={`${
                            active ? "bg-red-100 text-red-700" : "text-red-600"
                          } group flex items-center gap-2 w-full px-4 py-2 text-sm rounded-lg`}
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <div className="flex gap-2">
              <Link href="/api/auth/signin">
                <button className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-sm font-semibold transition">
                  Sign In
                </button>
              </Link>
              <Link href="/api/auth/signup">
                <button className="text-indigo-700 border border-indigo-500 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
