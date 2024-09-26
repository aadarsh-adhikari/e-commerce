import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/layout';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import Link for routing
import Loader from '../components/Loader';
import ProductCard from '../components/form/ProductCard';

const Category = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product/products/category/${slug}`);
        setData(response.data.products); 
      } catch (err) {
        console.error("Error fetching category products", err);
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
        <h1 className="text-center text-3xl font-bold mb-6">Products in Category: {categoryTitle}</h1>
          <ProductCard productcard={data}/>
      </Layout>
    </div>
  );
};

export default Category;
