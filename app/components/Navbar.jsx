"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage (or any custom auth method)
    const user = localStorage.getItem("user");
    setIsLogin(!!user);
  }, []);

  return (
    <nav className="w-full p-5 flex justify-between bg-black overflow-hidden">
      <div className="flex items-center justify-between">
        <Link
          href={"/"}
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animated-gradient-text"
        >
          AI Video Generator
        </Link>
      </div>
      <div className="w-44 flex justify-between">
        {!isLogin ? ( // Show login/signup buttons if not logged in
          <>
            <Link href={"/login"}>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Login
              </button>
            </Link>
            <Link href={"/signup"}>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Sign up
              </button>
            </Link>
          </>
        ) : (
          <div>
            <SignOutButton /> <p>User Logged In</p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
