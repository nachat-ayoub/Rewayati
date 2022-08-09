import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import LoadingPopup from "../../../components/LoadingPopup";
import getNovelChapters from "../../../services/getNovelChapters";

const ChapterPage = ({ chapterData }) => {
  const [chapters, setChapters] = useState([]);
  const [data, setData] = useState(null);
  const [chapterLoading, setChapterLoading] = useState(false);

  const [FontSize, setFontSize] = useState(null);

  const minFontSize = 14;
  const maxFontSize = 30;

  useEffect(() => {
    if (FontSize === null) {
      setFontSize(parseInt(localStorage.getItem("FontSize") || 16));
    } else {
      localStorage.setItem("FontSize", FontSize);
    }
  }, [FontSize]);

  useEffect(() => {
    // chapter content and title:
    setData(chapterData);

    async function initChapters() {
      // No Chapters Stored :
      const localData = JSON.parse(localStorage.getItem("chapters"));
      const currentDate = new Date().toISOString().split("T")[0];

      if (
        !localData ||
        localData?.chapters.length === 0 ||
        localData?.novelSlug !== data?.novel_slug ||
        localData?.createdAt !== currentDate
      ) {
        console.log("getting chapters");

        const Chapters = await getNovelChapters(chapterData?.novel_slug);
        setChapters(Chapters);
        localStorage.setItem(
          "chapters",
          JSON.stringify({
            novelSlug: data?.novel_slug,
            chapters: Chapters,
            createdAt: currentDate,
          })
        );
        console.log("Done getting chapters");
        // Chapters Stored :
      } else {
        console.log("chapters already saved");
        setChapters(localData?.chapters);
      }
    }

    initChapters();
  }, []);

  const pageTitle = `Rewayati - ${data?.chapter?.title} - ${data?.title}`;

  async function getChapterContent(ch_slug) {
    if (!ch_slug || ch_slug === ("" || "#")) return;
    setChapterLoading(true);
    const resp = await fetch(
      `https://ar-novels-api.herokuapp.com/api/novels/${data?.novel_slug}/${ch_slug}`
    );
    const chapterContent = await resp.json();
    setData(chapterContent);
    setChapterLoading(false);
  }

  return (
    <div className="">
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <div className="w-full h-full md:p-5">
        <div className="w-full h-full flex justify-between items-center flex-col">
          <h1 dir="ltr" className="text-center text-2xl font-bold">
            {data?.title} - {data?.chapter?.title}
          </h1>
          <div className="my-4 text-center text-xs font-semibold">
            <Link href={"/"}>
              <a className="hover:text-green-800">الرئيسية</a>
            </Link>
            /
            <Link href={`/novels/${data?.novel_slug}`}>
              <a className="hover:text-green-800">{data?.title}</a>
            </Link>
            /
            <Link href={`/novels/${data?.novel_slug}/${data?.chapter_slug}/#`}>
              <a className="hover:text-green-800">{data?.chapter?.title}</a>
            </Link>
          </div>

          <div className="w-full flex justify-between items-center my-3">
            {chapters.length > 0 ? (
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-2.5"
                value={data?.chapter_slug}
                onChange={(e) => getChapterContent(e.target.value)}
              >
                <option value="">الفصول</option>

                {chapters.map((ch) => (
                  <option value={ch.slug} key={ch.slug}>
                    {ch.text}
                  </option>
                ))}
              </select>
            ) : (
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-2.5">
                <option>الفصول</option>
              </select>
            )}
          </div>

          <div className="mb-2 w-full flex justify-between items-center">
            <Link
              href={
                data?.next?.disabled
                  ? "#"
                  : `/novels/${data?.novel_slug}/${data?.next?.slug}`
              }
            >
              <a
                onClick={async () => await getChapterContent(data?.next?.slug)}
                className={`text-xl cursor-pointer transition-all duration-150 ease-out bg-darkBlue hover:bg-darkGreen text-white w-10 h-10 rounded-sm flex justify-center items-center ${
                  data?.next?.disabled &&
                  " bg-opacity-80 hover:bg-darkBlue hover:bg-opacity-80"
                }`}
              >
                <i className="fa-solid fa-chevron-right" />
              </a>
            </Link>
            <div className="flex justify-center items-center">
              <span
                className="cursor-pointer mx-4 bg-darkBlue rounded-full w-9 h-9 flex justify-center items-center text-white"
                onClick={() => {
                  if (FontSize < maxFontSize) {
                    setFontSize(FontSize + 1);
                  }
                }}
              >
                <i className="fa-solid fa-plus" />
              </span>
              <span className="text-dark font-bold">
                حجم الخط - {FontSize}px
              </span>
              <span
                className="cursor-pointer mx-4 bg-darkBlue rounded-full w-9 h-9 flex justify-center items-center text-white"
                onClick={() => {
                  if (FontSize > minFontSize) {
                    setFontSize(FontSize - 1);
                  }
                }}
              >
                <i className="fa-solid fa-minus" />
              </span>
            </div>
            <Link
              href={
                data?.prev?.disabled
                  ? "#"
                  : `/novels/${data?.novel_slug}/${data?.prev?.slug}`
              }
            >
              <a
                onClick={async () => await getChapterContent(data?.prev?.slug)}
                className={`text-xl cursor-pointer transition-all duration-150 ease-out bg-darkBlue hover:bg-darkGreen text-white w-10 h-10 rounded-sm flex justify-center items-center ${
                  data?.prev?.disabled &&
                  " bg-opacity-80 hover:bg-darkBlue hover:bg-opacity-80"
                }`}
              >
                <i className="fa-solid fa-chevron-left" />
              </a>
            </Link>
          </div>
          {/* <!--  --> */}
          {chapterLoading && <LoadingPopup />}

          {/* <!-- Start: Chapter Content --> */}
          <div
            className="pb-4 px-2 md:px-16 font-bold text-justify text-dark"
            style={{ fontSize: FontSize + "px" }}
          >
            {data?.chapter?.content?.length > 0 ? (
              data?.chapter?.content?.map((text, i) => (
                <p key={i} className="py-4 whitespace-pre-line">
                  {text}
                </p>
              ))
            ) : (
              <p className="py-4">No Content Found</p>
            )}
          </div>
          {/* <!-- End: Chapter Content --> */}

          {chapterLoading && <LoadingPopup />}

          {/* <!-- Start: Navigation --> */}
          <div className="mt-2 w-full flex justify-between items-center">
            <Link
              href={
                data?.next?.disabled
                  ? "#"
                  : `/novels/${data?.novel_slug}/${data?.next?.slug}`
              }
            >
              <a
                onClick={async () => await getChapterContent(data?.next?.slug)}
                className={`text-xl cursor-pointer transition-all duration-150 ease-out bg-darkBlue hover:bg-darkGreen text-white w-10 h-10 rounded-sm flex justify-center items-center ${
                  data?.next?.disabled &&
                  " bg-opacity-80 hover:bg-darkBlue hover:bg-opacity-80"
                }`}
              >
                <i className="fa-solid fa-chevron-right" />
              </a>
            </Link>

            {/* <!-- Start: Back button --> */}
            <div
              dir="ltr"
              className="w-1/2 max-w-fit text-center flex justify-center items-center flex-col"
            >
              <Link href={`/novels/${data?.novel_slug}/`}>
                <a className="w-full text-lg font-bold text-white px-4 py-2 rounded-sm bg-darkBlue overflow-hidden text-ellipsis whitespace-nowrap hover:bg-darkGreen">
                  {data?.title}
                </a>
              </Link>
            </div>
            {/* <!-- End: Back button --> */}

            <Link
              href={
                data?.next?.disabled
                  ? "#"
                  : `/novels/${data?.novel_slug}/${data?.next?.slug}`
              }
            >
              <a
                onClick={async () => await getChapterContent(data?.prev?.slug)}
                className={`text-xl cursor-pointer transition-all duration-150 ease-out bg-darkBlue hover:bg-darkGreen text-white w-10 h-10 rounded-sm flex justify-center items-center ${
                  data?.prev?.disabled &&
                  " bg-opacity-80 hover:bg-darkBlue hover:bg-opacity-80"
                }`}
              >
                <i className="fa-solid fa-chevron-left" />
              </a>
            </Link>
          </div>
          {/* <!-- End: Navigation --> */}
          <div className="text-sm font-bold mt-2">العودة إلى الرواية</div>

          {/* <!--  --> */}
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;

export const getServerSideProps = async (ctx) => {
  const res = await fetch(
    `${process.env.BASE_API_URL}/${ctx.params.novelSlug}/${ctx.params.chapterSlug}`
  );
  const chapterData = await res.json();

  return {
    props: {
      chapterData,
    },
  };
};
