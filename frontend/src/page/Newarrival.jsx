import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import ProductCard from "../components/form/ProductCard";
import Loader from "../components/Loader";

const Newarrival = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError("Failed to load new arrivals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewArrivals();
  }, []);

  return (
    <div>
      <Layout>
        {loading ? (
          <Loader/>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : (
          <ProductCard productcard={newArrivals} />
        )}
      </Layout>
    </div>
  );
};

export default Newarrival;
