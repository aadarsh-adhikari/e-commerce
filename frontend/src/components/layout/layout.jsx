import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import{ Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";

const Layout = ({
  children,
  title = "Read Nepal",
  description = "MERN STACK application for book site.",
  keywords = "Read Nepal, book , Nepali books",
  author = "Aadarsh Adhikari",
}) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main>
      <Toaster/>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
