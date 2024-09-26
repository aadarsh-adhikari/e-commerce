import React, { useState, useEffect } from 'react';
import Layout from './layout';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function Search() {
  const query = new URLSearchParams(useLocation().search);
  const keyword = query.get('keyword'); // Get the 'keyword' from the query string
  const [data, setData] = useState([]);

  const getSearchProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/product/search?keyword=${keyword}`
      );
      if (data?.success) {
        setData(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (keyword) {
      getSearchProduct();
    }
  }, [keyword]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Search Results for "{keyword}"
        </h2>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={`/product/${product.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-md mb-4">
                    <img
                      src={`http://localhost:3000/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="w-full h-60  group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {product.description.length > 50
                        ? `${product.description.substring(0, 50)}...`
                        : product.description}
                    </p>
                    <p className="text-lg font-semibold text-gray-900 mt-4">
                      Rs.{product.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>No products found for "{keyword}"</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Search;
