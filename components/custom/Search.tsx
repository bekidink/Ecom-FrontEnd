"use client"
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
// import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
// import useMobile from "@/hooks/use-mobile";

const Search = () => {
  const location = usePathname();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const isMobile = useIsMobile();
  const params = usePathname();
  const searchText = params.split("/")[2];
 const router=useRouter()
  useEffect(() => {
    const isSearch = location.startsWith("/search") ;
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    router.push("/search/n")
    // navigate("/search");
  };

  const handleOnChange = (e:any) => {
    const value = e.target.value;
    
     router.push(`/search/${value}`);
    // navigate(url);
  };

  return (
    <div className="w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200 ">
      <div>
        {isMobile && isSearchPage ? (
          <Link
            href={"/"}
            className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md"
          >
            <FaArrowLeft size={20} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
            <IoSearch size={22} />
          </button>
        )}
      </div>
      <div className="w-full h-full">
        {!isSearchPage ? (
          //not in search page
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "panner"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          //when i was search page
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for atta dal and more."
              autoFocus
              defaultValue={searchText}
              className="bg-transparent w-full h-full outline-none"
              onChange={handleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
