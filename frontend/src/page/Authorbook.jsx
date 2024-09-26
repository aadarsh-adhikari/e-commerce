import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; // Import useParams to get the author's slug from the URL
import ProductCard from "../components/form/ProductCard";

const Authorbook = () => {
  const { slug } = useParams(); // Get the author's slug from the URL
  const [books, setBooks] = useState([]); // State to store the list of books
  const [loading, setLoading] = useState(true); // Loading state to show while data is being fetched

  // Function to fetch books by the author
  const getBooksByAuthor = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/product/author/${slug}`
      );
      if (data?.success) {
        setBooks(data.products); // Set the books in the state
      } else {
        setBooks([]); // If no success, set an empty array
      }
    } catch (error) {
      console.log("Error fetching books by author:", error);
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  // Fetch the books when the component mounts or when the slug changes
  useEffect(() => {
    getBooksByAuthor();
      window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div>
      <Layout>
       <ProductCard productcard={books}/>
      </Layout>
    </div>
  );
};

export default Authorbook;
