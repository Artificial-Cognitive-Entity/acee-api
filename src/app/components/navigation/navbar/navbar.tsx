'use client'
import React from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      {(pathname == '/' || pathname == '/login' || pathname == '/features' || pathname == '/team') ? (
        <nav className="bg-black shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/features" className="font-bold text-xl text-white">
                    ACEE
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/features"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      pathname === '/features'
                        ? 'border-b-2 border-purple-500 text-white'
                        : 'border-transparent text-gray-300 hover:border-gray-500 hover:text-white'
                    }`}
                  >
                    Features
                  </Link>
                  <Link
                    href="/team"
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      pathname === '/team'
                        ? 'border-b-2 border-purple-500 text-white'
                        : 'border-transparent text-gray-300 hover:border-gray-500 hover:text-white'
                    }`}
                  >
                    Team
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Link
                  href="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Login
                </Link>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                href="/features"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  pathname === '/features'
                    ? 'bg-gray-700 border-purple-500 text-white'
                    : 'border-transparent text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white'
                }`}
              >
                Features
              </Link>
              <Link
                href="/team"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  pathname === '/team'
                    ? 'bg-gray-700 border-purple-500 text-white'
                    : 'border-transparent text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white'
                }`}
              >
                Team
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default Navbar