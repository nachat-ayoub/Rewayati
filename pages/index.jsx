import NovelRow from "../components/NovelRow";

export default function Home({ data }) {
  return (
    <div className="">
      <NovelRow title="آخر التحديثات" novels={data?.last_updates} />
      <NovelRow small title="الأكثر قراءة" novels={data?.popular_novels} />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch(process.env.BASE_API_URL);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
