import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; 
import ProductCard from "../components/form/ProductCard";

const Authorbook = () => {
  const { slug } = useParams(); 
  const [books, setBooks] = useState([]); 
  const getBooksByAuthor = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/author/${slug}`
      );
      if (data?.success) {
        setBooks(data.products);
      } else {
        setBooks([]); 
      }
    } catch (error) {
    } 
  };

  useEffect(() => {
    getBooksByAuthor();
      window.scrollTo(0, 0);
  }, [slug]);
  const author = slug.replace(/-/g, ' ');

  return (
    <div>
      <Layout>
      <h1 className="text-center text-2xl font-bold my-2">Books by {author}</h1>
      <p className="text-center text-xl">{books.length} result found</p>
       <ProductCard productcard={books}/>
      </Layout>
    </div>
  );
};

export default Authorbook;
