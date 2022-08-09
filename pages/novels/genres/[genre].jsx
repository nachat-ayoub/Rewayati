import Link from "next/link";
import NovelRow from "../../../components/NovelRow";
import Title from "../../../components/Title";

export default function SearchByGenrePage({ data }) {
  return (
    <div className="">
      {data?.novels.length > 0 ? (
        <NovelRow title={`”${data?.genre?.text}”`} novels={data?.novels} />
      ) : (
        <div className="w-full">
          <Title title={`”${data?.genre?.text}”`} />
          <div className="w-full flex justify-center items-center py-5 px-4">
            <img
              className="w-full md:w-1/3 object-contain"
              src="/404_Novel.png"
              alt="404 Novel"
            />
          </div>
        </div>
      )}

      <div className="w-full">
        <Title title={`التصنيفات :`} />
        <ul className="w-full flex flex-wrap justify-start items-center py-5 px-4">
          {data?.all_genres?.map((genre) => (
            <Link key={genre.slug} href={"/novels/genres/" + genre.slug}>
              <a>
                <li className="flex items-center w-12 min-w-fit py-1 px-3 ml-6 font-semibold text-sm hover:text-darkGreen whitespace-nowrap">
                  <span className="ml-2">
                    <i className="fa-solid fa-caret-left"></i>
                  </span>
                  {genre.text}
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch(
    `${process.env.BASE_API_URL}/genre/${ctx.params.genre}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
