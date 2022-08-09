const Title = ({ title, classes }) => {
  return (
    <h2 className={"text-white font-bold mb-2 " + classes || "text-xl"}>
      <span className="flex justify-start items-center">
        <span className=" bg-gradient-to-l from-darkBlue to-green-800 py-1 px-4 rounded-sm whitespace-nowrap tracking-wide capitalize">
          {title}
        </span>
        <div className="w-0 h-0 border-t-8 border-b-8 border-t-transparent border-b-transparent border-r-[10px] border-r-green-800" />
      </span>
    </h2>
  );
};

export default Title;
