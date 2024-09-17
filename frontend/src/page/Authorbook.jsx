import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; // Import useParams to get the author's slug from the URL

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
  }, [slug]);

  return (
    <div>
      <Layout>
        <div className="mt-12">
          <h4 className="font-bold text-2xl text-center mb-4">
            Books by {slug}
          </h4>

          {/* Show a loading message while fetching */}
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
              {books.length > 0 ? (
                books.map((book) => (
                  <Link
                    key={book._id}
                    to={`/product/${book.slug}`}
                    className="group block p-2 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="relative overflow-hidden rounded-md">
                      <img
                        src={`http://localhost:3000/product/product-photo/${book._id}`}
                        alt={book.name}
                        className="h-48 w-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h5 className="text-lg font-semibold text-center">
                        {book.name}
                      </h5>
                      <Link to={`/author/${encodeURIComponent(book.author)}`}>
                  <p className="text-sm text-gray-600 text-center mt-1">
                    By {book.author}
                  </p>
                  </Link>
                      <p className="text-xl font-semibold text-center mt-3">
                        RS.{book.price}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-600">
                  No books available by this author.
                </p>
              )}
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Authorbook;
