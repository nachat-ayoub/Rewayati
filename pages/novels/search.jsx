import Head from "next/head";
import NovelRow from "../../components/NovelRow";
import Title from "../../components/Title";

const SearchPage = ({ data }) => {
  return (
    <div>
      <Head>
        <title>{`Rewayati - ”${data?.query}” نتائج لـ`}</title>
      </Head>

      <div className="mt-4">
        {data?.results.length > 0 ? (
          <NovelRow
            title={`${data.results_count || "0"} نتائج لـ ”${data?.query}”`}
            novels={data?.results}
          />
        ) : (
          <div className="w-full">
            <Title title={`نتائج لـ ”${data?.query}”`} />
            <div className="w-full flex justify-center items-center py-5 px-4">
              <img
                className="w-full md:w-1/3 object-contain"
                src="/404_Novel.png"
                alt="404 Novel"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

export const getServerSideProps = async (ctx) => {
  const res = await fetch(
    `${process.env.BASE_API_URL}/search?s=${ctx.query.s || ""}`
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
