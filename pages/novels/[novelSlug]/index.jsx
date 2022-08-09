import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Title from "../../../components/Title";
import getNovelChapters from "../../../services/getNovelChapters";

const novelPage = ({ novel, api_url }) => {
  const [chaptersLoaded, setChaptersLoaded] = useState(false);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    async function init() {
      const chaptersData = await getNovelChapters(novel?.novel_slug);
      setChaptersLoaded(true);
      setChapters(chaptersData);
      localStorage.setItem(
        "chapters",
        JSON.stringify({ novelSlug: novel?.novel_slug, chapters: chaptersData })
      );
    }
    init();
  }, []);

  return (
    <>
      <Head>
        <title>{`Rewayati - ${novel?.title} رواية`}</title>
      </Head>

      <div className="w-full h-full p-3 md:p-5">
        <div className="w-full h-full flex justify-between items-center flex-col md:items-start md:flex-row">
          <div className="w-60 h-80 ml-3">
            <img
              className="w-full h-full object-cover rounded border border-gray-300 shadow-md"
              loading="lazy"
              src={novel?.image}
              alt={novel?.title}
            />
          </div>
          <div className="w-full">
            <h1 className="text-center md:text-right text-2xl font-bold my-3">
              {novel?.title}
            </h1>
            <div className="">
              <span className="text-sm font-bold ml-2"> المرتبة: </span>
              <span className="text-sm"> {novel?.rank} </span>
            </div>
            <div className="">
              <span className="text-sm font-bold ml-2"> اسم بديل: </span>
              <span className="text-sm"> {novel?.alternative} </span>
            </div>
            {novel?.authors?.length > 0 && (
              <div className="">
                <span className="text-sm font-bold ml-2"> المؤلف: </span>
                <span className="text-sm">
                  {novel?.authors?.map((author) => (
                    <span key={author?.slug}>{author?.text}</span>
                  ))}
                </span>
              </div>
            )}

            {novel?.genres?.length > 0 && (
              <div className="">
                <span className="text-sm font-bold ml-2"> التصنيف: </span>
                <span className="text-sm">
                  {novel?.genres?.map((genre) => (
                    <Link
                      key={genre?.slug}
                      href={`/novels/genres/${genre?.slug}`}
                    >
                      <a>
                        <span className="text-sm hover:text-darkGreen font-semibold">
                          {genre?.text}،
                        </span>
                      </a>
                    </Link>
                  ))}
                </span>
              </div>
            )}

            <div className="my-4">
              <Title classes="text-base" title="القصة :" />
              <p className="mt-4 font-bold text-justify">{novel?.story}</p>
            </div>
          </div>
        </div>
        {/* <!-- Last And First Chapter --> */}
        <div className="mt-5 w-full flex items-center justify-between">
          <Link
            href={
              chaptersLoaded && chapters?.at(-1)
                ? `/novels/${novel?.novel_slug}/${chapters?.at(-1).slug}`
                : "#أول فصل"
            }
          >
            <a className="text-white bg-gradient-to-l from-darkBlue to-green-900 rounded font-bold px-4 py-1.5">
              أول فصل
            </a>
          </Link>
          <Link
            href={
              chaptersLoaded && chapters?.at(0)
                ? `/novels/${novel?.novel_slug}/${chapters?.at(0).slug}`
                : "#آخر فصل"
            }
          >
            <a className="text-white bg-gradient-to-l from-darkBlue to-green-900 rounded font-bold px-4 py-1.5">
              آخر فصل
            </a>
          </Link>
        </div>
        {/* <!-- Last And First Chapter --> */}

        <div className="my-5">
          <div className="flex justify-between">
            <Title classes="text-xl" title="اخر الفصول" />
            <div
              onClick={() => setChapters([...chapters].reverse())}
              className="p-2 text-lg hover:text-darkGreen cursor-pointer rotate-90"
            >
              <i className="fa-solid fa-right-left" />
            </div>
          </div>

          <div className="w-full h-60 overflow-y-auto">
            <ul className="w-full mt-4">
              {chaptersLoaded && chapters.length > 0 ? (
                chapters.map((ch) => (
                  <Link
                    key={ch?.slug}
                    href={`/novels/${novel?.novel_slug}/${ch?.slug}`}
                  >
                    <a>
                      <li className="w-full text-dark text-md font-bold px-2 py-4 border-b-2 border-b-gray-300 transition-all duration-150 ease-out hover:bg-gray-100 hover:text-green-800 hover:border-green-600">
                        {ch?.text}
                      </li>
                    </a>
                  </Link>
                ))
              ) : (
                <div
                  dir="ltr"
                  className="w-full flex flex-col justify-center items-center"
                >
                  <h3 className="text-xl font-bold text-center mb-2">
                    Loading...
                  </h3>
                  <div className="text-4xl animate-spin">
                    <i className="fa-solid fa-spinner" />
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default novelPage;

export const getServerSideProps = async (ctx) => {
  let res = await fetch(`${process.env.BASE_API_URL}/${ctx.params?.novelSlug}`);
  const novel = await res.json();

  return {
    props: {
      novel,
      api_url: process.env.BASE_API_URL,
    },
  };
};
