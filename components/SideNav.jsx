import Link from "next/link";
import { useEffect, useState } from "react";

const SideNav = ({ sideNavHidden, ToggleSideNav }) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (sideNavHidden) {
      const timer = setTimeout(() => {
        setHidden(sideNavHidden);
        clearTimeout(timer);
      }, 400);
    } else setHidden(sideNavHidden);
  }, [sideNavHidden]);

  return (
    <>
      {!hidden && (
        <div className="min-w-[100vw] min-h-[100vh] w-full h-full fixed top-0 right-0 z-50 flex">
          <div
            className={`bg-white h-full w-3/5 max-w-xs flex justify-start items-center flex-col text-dark shadow-lg border-gray-200 border-l translate-x-fulls ${
              sideNavHidden ? "animate-slideOut" : "animate-slideIn"
            } ${hidden ? "hidden" : "block"}`}
          >
            <div className="w-full p-3">
              <button className="bg-gradient-to-l from-darkBlue to-green-900 rounded font-bold text-gray-200 w-full p-4 hover:bg-gradient-to-r transition-all ease-out duration-300">
                تسجيل الدخول
              </button>
            </div>
            <hr className="w-full mb-1 mx-auto border-gray-300 border" />
            <div className="w-full p-3">
              <ul className="w-full">
                <li className="hover:text-green-800 my-3 text-lg font-bold">
                  <Link href="/">
                    <a>
                      <span className="ml-2">
                        <i className="fa-solid fa-home" />
                      </span>
                      الرئيسية
                    </a>
                  </Link>
                </li>
                <li className="hover:text-green-800 my-3 text-lg font-bold">
                  <Link href="/">
                    <a>
                      <span className="ml-2">
                        <i className="fa-solid fa-book" />
                      </span>
                      المكتبة
                    </a>
                  </Link>
                </li>
                <li className="hover:text-green-800 my-3 text-lg font-bold">
                  <Link href="/">
                    <a>
                      <span className="ml-2">
                        <i className="fa-solid fa-shield-halved" />
                      </span>
                      سياسة الخصوصية
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div
            onClick={ToggleSideNav}
            className={`flex-1 h-full cursor-pointer bg-dark bg-opacity-60 ${
              sideNavHidden ? "animate-fadeOut" : "animate-fadeIn"
            }`}
          />
        </div>
      )}
    </>
  );
};

export default SideNav;
