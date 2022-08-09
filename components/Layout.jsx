import Head from "next/head";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div dir="rtl" className="font-cairo">
      <Head>
        {/* <title>Rewayati - طغاة المانها وصلوا لعالم الروايات</title> */}
      </Head>
      <Navbar />

      <main className="p-2 md:p-8">{children}</main>
    </div>
  );
};

export default Layout;
