import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/layout';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import Loader from '../components/Loader';
import ProductCard from '../components/form/ProductCard';

const Category = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/products/category/${slug}`);
        setData(response.data.products); 
      } catch (err) {
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return  <Loader/>;
  const categoryTitle = slug.replace(/-/g, ' ');

  return (
    <div>
      <Layout>
        <h1 className="text-center text-2xl font-bold my-2">Products in Category: {categoryTitle}</h1>
        <p className="text-center text-xl">{data.length} result found</p>
          <ProductCard productcard={data} />
      </Layout>
    </div>
  );
};

export default Category;
