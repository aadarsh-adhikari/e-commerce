import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { Link } from "react-router-dom";
const Newarrival = () => {
const [newArrivals, setNewArrivals] = useState([]);
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

  useEffect(() => {
    getNewArrivals();
  }, []);
  return (

    <div>
      <Layout>
      <div className="m-12">
          <h4 className="font-bold text-2xl text-center mb-4">New Arrivals</h4>
          <span className="block text-center font-light mb-8">
            Find Your Next Favorite Book Here. Explore Fresh Arrivals!
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-3">
            {newArrivals.map((product) => (
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
                  <Link to={`/author/${encodeURIComponent(product.author)}`}>
                  <p className="text-sm text-gray-600 mt-1">
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
         
        </div>
      </Layout>
    </div>
  )
}

export default Newarrival
