const LoadingPopup = () => {
  return (
    <div
      dir="ltr"
      className="py-6 w-full flex flex-col justify-center items-center"
    >
      <h3 className="text-xl font-bold text-center mb-2">Loading...</h3>
      <div className="text-4xl animate-spin">
        <i className="fa-solid fa-spinner" />
      </div>
    </div>
  );
};

export default LoadingPopup;
