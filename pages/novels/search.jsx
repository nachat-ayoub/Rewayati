import Head from "next/head";
import { useRouter } from "next/router";
import NovelRow from "../../components/NovelRow";
import Title from "../../components/Title";

const SearchPage = ({ data, currentOrder, currentPage }) => {
  const router = useRouter();

  // ! Orders
  const orders = [
    {
      text: "ملائم",
      slug: "",
    },
    {
      text: "الأحدث",
      slug: "latest",
    },
    {
      text: "A-Z",
      slug: "alphabet",
    },
    {
      text: "التقييم",
      slug: "rating",
    },
    {
      text: "الرائج",
      slug: "trending",
    },
    {
      text: "الاكثر مشاهدات",
      slug: "views",
    },
    {
      text: "جديد",
      slug: "new-manga",
    },
  ];

  const updateSearchParams = (param) => {
    const queries = ["s", "page", "orderby"];

    const key = Object.keys(param)[0];
    const val = param[key];

    let urlParams = [];

    queries.map((query) => {
      if (key === query) {
        urlParams.push(query + "=" + val);
      } else {
        if (query === "page") {
          urlParams.push(`${query}=1`);
        } else if (router.query[query]) {
          urlParams.push(`${query}=${router.query[query]}`);
        } else {
          urlParams.push(`${query}=`);
        }
      }
    });

    router.push(`/novels/search?${urlParams.join("&")}`);
  };

  return (
    <div>
      <Head>
        <title>{`Rewayati - ”${data?.query}” نتائج لـ`}</title>
      </Head>

      <div className="mt-4 mb-8 flex flex-col flex-start">
        <Title title={"ترتيب بـ "} />
        <div className="mt-4 flex flex-wrap flex-start">
          {orders.map((order) => (
            <span
              key={order.slug}
              className={`mx-2 font-semibold hover:text-darkGreen cursor-pointer ${
                order.slug == currentOrder && "text-green-700 font-bold"
              }`}
              onClick={() => updateSearchParams({ orderby: order.slug })}
            >
              {order.text}
            </span>
          ))}
        </div>
      </div>

      <div className="my-4">
        {data && data?.results?.length > 0 ? (
          <NovelRow
            title={`${data.results_count} نتائج لـ ”${data?.query}”`}
            novels={data?.results}
          />
        ) : (
          <div className="w-full">
            <Title title={`0 نتائج لـ ”${data?.query}”`} />
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
      {data && data?.pages > 1 && (
        <>
          <Title title={"الصفحات : "} classes="mt-10" />
          <div className="mt-4 flex flex-wrap flex-start">
            {[...Array(data?.pages).keys()].map((page) => (
              <span
                key={page + 1}
                className={`cursor-pointer px-2 mx-0.5 border-2 border-green-700 rounded-sm ${
                  page + 1 == currentPage ? "bg-green-900 text-white" : ""
                }`}
                onClick={() => updateSearchParams({ page: page + 1 })}
              >
                {page + 1}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;

export const getServerSideProps = async (ctx) => {
  const res = await fetch(
    `${process.env.BASE_API_URL}/search/?page=${ctx.query.page || 1}&s=${
      ctx.query.s || ""
    }&orderby=${ctx.query.orderby || ""}`
  );

  const data = await res.json();

  return {
    props: {
      data,
      currentOrder: ctx.query.orderby || "",
      currentPage: ctx.query.page || 1,
    },
  };
};
