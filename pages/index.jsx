import NovelRow from '../components/NovelRow';
import Link from 'next/link';

export default function Home({ data }) {
  return (
    <div className='w-full'>
      <NovelRow title='آخر التحديثات' novels={data?.last_updates} />
      <NovelRow small title='الأكثر قراءة' novels={data?.popular_novels} />
      <div
        dir='ltr'
        className='w-full flex justify-center items-center gap-x-4'
      >
        {data.pages?.prev && (
          <Link
            href={data.pages?.prev === '1' ? '/' : '/?page=' + data.pages?.prev}
          >
            <a>
              <div className='bg-green-800 text-sm font-bold text-white cursor-pointer px-3 py-1 rounded flex items-center gap-x-2'>
                <span>
                  <i className='fa-solid fa-caret-left' />
                </span>
                <span>Prev</span>
              </div>
            </a>
          </Link>
        )}
        <div className='bg-green-800 text-sm font-bold text-white cursor-pointer px-3 py-1 rounded flex items-center gap-x-2'>
          Page: {data.page ?? 1}
        </div>
        {data.pages?.next && (
          <Link href={'/?page=' + data.pages?.next}>
            <a>
              <div className='bg-green-800 text-sm font-bold text-white cursor-pointer px-3 py-1 rounded flex items-center gap-x-2'>
                <span>Next</span>
                <span>
                  <i className='fa-solid fa-caret-right' />
                </span>
              </div>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch(
    process.env.BASE_API_URL +
      (ctx.query?.page ? '?page=' + ctx.query.page : '')
  );
  const data = await res.json();
  console.log(data.pages);

  return {
    props: {
      data,
    },
  };
};
