import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import axios from "axios";
import AdminMenu from "../../components/layout/AdminMenu";
import { Link } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState([]);

  // Fetch all products
  const getallProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/product/get-product"
      );
      if (data.success) {
        setProduct(data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallProduct();
  }, []);

  return (
    <div>
      <Layout title="Dashboard - Products">
        <div className="flex">
          <AdminMenu />
          <div className="w-full">
            <p className="font-bold text-center mt-6 text-3xl">All Products</p>

            <div className="flex justify-center flex-wrap gap-6 p-6">
              {product?.map((p) => (
                <Link
                  key={p._id}
                  to={`${p.slug}`}
                  className="group relative block w-80 rounded-lg shadow-xl hover:shadow-2xl hover:shadow-gray-600 transition-shadow duration-300 bg-white"
                >
                  <div className="relative overflow-hidden rounded-t-lg border-2 border-black-200">
                    <img
                      className="h-64 w-full  group-hover:scale-110 transition-transform duration-300 "
                      src={`http://localhost:3000/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                  </div>

                  <div className="p-4">
                    <h5 className="text-lg font-bold text-slate-900">
                      {p.name}
                    </h5>
                    <p className="text-sm text-gray-600 mt-1">By {p.author}</p>

                    <div className="mt-3">
                      <p className="text-2xl font-semibold text-slate-900">
                        ${p.price}
                      </p>
                    </div>

                    <button className="mt-4 w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg transition hover:bg-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Product;
