import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useAuth } from "../components/auth/Auth";
import axios from "axios";
import { Link } from "react-router-dom";

// Import local images
import nepali from "../img/nepali.png";
import MangaandComics from "../img/Manga_and_Comics.jpg";
import FictiotAndLiterature from "../img/fiction-and-literature.jpeg";
import BusinessAndInvesting from "../img/business-and-investment.jpeg";
import banner from "../img/banner.png";
import albertcamus from "../img/albert-camus.jpeg";
import morganhousel from "../img/morgan-housel.jpeg";
const Homepage = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  const categoryImages = {
    Nepali: nepali,
    "Manga and Comics": MangaandComics,
    "Fiction And Literature": FictiotAndLiterature,
    "Business And Investing": BusinessAndInvesting,
  };

  // Fetch categories from API
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/category/get-category"
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch new arrivals from API
  const getNewArrivals = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/product/recent-products"
      );
      if (data?.success) {
        setNewArrivals(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const displayNewArrivals = newArrivals.slice(0, 4);

  useEffect(() => {
    getAllCategories();
    getNewArrivals();
  }, []);

  return (
    <Layout title="Ecommerce - Homepage">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Browse by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              to={`/category/${category.slug}`}
              key={category._id}
              className="group block p-1 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={categoryImages[category.name] || "/images/default.jpg"} // Fallback image
                  alt={category.name}
                  className="h-48 w-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold mt-4 text-center">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
        <div className="m-5 bg-gradient-to-t from-white to-blue-300 text-center p-6 ">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-blue-800">
              Welcome to Our Store!
            </h1>
            <p className="text-lg text-gray-700 mt-2">
              Explore Our Latest Collections and Find Your Next Favorite Book.
            </p>
          </div>
          <img
            src={banner}
            alt="Banner"
            className="w-full h-auto max-h-72 object-cover rounded-lg"
          />
        </div>

        <div className="mt-12">
          <h4 className="font-bold text-2xl text-center mb-4">New Arrivals</h4>
          <span className="block text-center font-light mb-8">
            Find Your Next Favorite Book Here. Explore Fresh Arrivals!
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayNewArrivals.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product.slug}`}
                className="group block p-2 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={`http://localhost:3000/product/product-photo/${product._id}`}
                    alt={product.name}
                    className="h-48 w-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-center">
                    {product.name}
                  </h5>

                  <Link to={`/author/${encodeURIComponent(product.author)}`}>
                    <p className="text-sm text-gray-600 text-center mt-1">
                      By {product.author}
                    </p>

                  </Link>
                  <p className="text-xl font-semibold text-center mt-3">
                    Rs.{product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
          <Link to="/new-arrivals" className="block text-blue-600 hover:underline">
  <button className="border-2 border-red-400 hover:border-blue-600 text-red-400 rounded-lg py-2 px-4  hover:text-blue-600 transition-colors duration-300">
    See All New Arrivals
  </button>
</Link>

          </div>
        </div>
        <div className="mt-10 ">
          <h4 className="font-bold text-2xl text-center mb-4">By Author</h4>
          <span className="block text-center font-light mb-8">
            Discover Books by Bestselling Authors in Our Collection.
          </span>
          <div className="flex flex-wrap justify-center text-center ">
            <Link
              to="/author/albert-camus"
              className="flex flex-col items-center m-2 group"
            >
              <img
                src={albertcamus}
                className="h-24 w-24 object-cover rounded-full mb-2"
                alt="Albert Camus"
              />
              <span className="text-lg text-blue-400 group-hover:text-blue-700">
                Albert Camus
              </span>
            </Link>
            <Link
              to="/author/morgan-housel"
              className="flex flex-col items-center m-2 group"
            >
              <img
                src={morganhousel}
                className="h-24 w-24 object-cover rounded-full mb-2"
                alt="Morgan Housel"
              />
              <span className="text-lg text-blue-400 group-hover:text-blue-700">
                Morgan Housel
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
