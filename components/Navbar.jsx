import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import SideNav from "./SideNav";

const Navbar = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sideNavHidden, setSideNavHidden] = useState(true);

  const ToggleSideNav = () => {
    console.log("bar clicked");
    setSideNavHidden(!sideNavHidden);
  };

  const router = useRouter();
  return (
    <nav className="bg-darkBlue bg-gradient-to-l from-darkBlue to-green-900 text-white px-3 py-2 mb-2 w-full flex justify-between items-center relative">
      {/* start: SideNav */}
      <SideNav sideNavHidden={sideNavHidden} ToggleSideNav={ToggleSideNav} />
      {/* end: SideNav */}

      <div className="w-1/5 flex justify-start">
        <span onClick={ToggleSideNav} className="mx-2.5 cursor-pointer">
          <i className="fa-solid fa-bars" />
        </span>
        <span id="appMode" className="mx-2.5 cursor-pointer">
          <i className="fa-solid fa-sun" />
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchKeyword.trim();
          if (searchKeyword)
            router.push(
              "/novels/search/?s=" + searchKeyword.split(" ").join("+")
            );
        }}
        className="w-3/5 relative"
      >
        <input
          className="w-full text-dark placeholder:text-gray-700 font-bold text-sm px-2 py-2 pr-8 rounded"
          type="text"
          placeholder="البحث"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <span
          className={`cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 ${
            searchKeyword != "" ? "text-dark" : "text-gray-700"
          }`}
        >
          <i className="fa-solid fa-search" />
        </span>
      </form>

      {/* <!-- Logo --> */}
      <span className="w-1/5 cursor-pointer flex items-center justify-end">
        <Link href="/">
          <a>
            <span className="font-semibold capitalize hidden sm:inline">
              Rewayati
            </span>
            <span className="mr-2">
              <i className="fa-solid fa-book-bookmark" />
            </span>
          </a>
        </Link>
      </span>
    </nav>
  );
};

export default Navbar;
