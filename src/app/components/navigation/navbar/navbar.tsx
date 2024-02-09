'use client'
import React from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation'

const Navbar = () => {

    const pathname = usePathname();
    return (
        <>
        {/* only show navbar on landing page */}
        {(pathname == '/' || pathname == '/about' || pathname == '/login' || pathname == '/features' || pathname == '/team' ) ? <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link href=".././about">About</Link>
                            </li>
                            <li>
                                <Link href="../../features">Features</Link>
                            </li>
                            <li>
                                <a>Team</a>
                                <ul className="p-2">
                                    <li><a>Nick Procaccio</a></li>
                                    <li><a>Joshua Abrams</a></li>
                                    <li><a>Kayla Douglas</a></li>
                                    <li><a>Mihir Araveeti</a></li>
                                    <li><a>Celina Alzenor</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <Link href="../../" className="btn btn-ghost text-xl">ACEE</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link href="../../about">About</Link>
                        </li>
                        <li>
                            <Link href="../../features">Features</Link>
                        </li>
                        <li>
                            <details>
                                <summary>Team</summary>
                                <ul className="p-2">
                                    <li><a>1</a></li>
                                    <li><a>2</a></li>
                                    <li><a>3</a></li>
                                    <li><a>4</a></li>
                                    <li><a>5</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link href="../../login" className="btn">Login</Link>
                </div>
            </div>
            :
            
            <div></div>}
            
        </>



    )
}

export default Navbar