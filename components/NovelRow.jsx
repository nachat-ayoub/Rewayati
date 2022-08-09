import NovelCard from "./NovelCard";
import Title from "./Title";

const NovelRow = ({ title, novels, small }) => {
  return (
    <div>
      <div className="my-3">
        <Title title={title} classes="text-lg" />
        {small ? (
          <div className="px-2 py-5 gap-2 sm:gap-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10">
            {novels?.length > 0 ? (
              novels.map((novel) => (
                <NovelCard key={novel?.title} small novel={novel} />
              ))
            ) : (
              <h4 className="text-lg font-bold text-dark">لا توجد روايات!</h4>
            )}
          </div>
        ) : (
          <div className="px-2 py-5 gap-2 sm:gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {novels?.length > 0 ? (
              novels.map((novel) => (
                <NovelCard key={novel?.title} novel={novel} />
              ))
            ) : (
              <h4 className="text-lg font-bold text-dark">لا توجد روايات!</h4>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NovelRow;
