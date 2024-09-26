import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdArrowLeft } from "react-icons/md";
import CartButton from "../components/form/CartButton";

const ProductDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/product/get-product/${slug}`);
      if (response.data?.success) {
        setData(response.data.product);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  const back = () => {
    navigate(-1);
  };

  return (
    <div>
      <Layout>
        <div className="flex justify-center items-center text-[20px] w-1/5 underline text-blue-300"> 
          <MdArrowLeft className="h-9 w-9 text-[20px] text-blue-400"/>
          <button type="button" onClick={back}>Back</button>
        </div>
        <div className="m-5">
          <div className="flex flex-row flex-wrap p-4">
            <div className="md:w-1/2 w-full">
              <div className="flex justify-center items-center h-full">
                <img
                  src={`http://localhost:3000/product/product-photo/${data._id}`}
                  className="h-80 w-full md:h-80 md:w-1/2 transition-transform duration-300 hover:scale-105 rounded-lg select-none"
                  alt={data.name}
                />
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <p className="font-bold">{data.name}</p>
              <p>{data.description}</p>
              <Link to={`/author/${encodeURIComponent(data.author)}`} className="text-blue-600 hover:underline hover:text-blue-400">
                By {data.author}
              </Link>
              <p className="font-semibold">Rs. {data.price}</p>
              <div className="space-x-3 mt-2">
                <button className="p-2 bg-yellow-300 hover:bg-yellow-400 rounded-md">Buy Now</button>
                <CartButton item={data} cartStyle="p-2 bg-yellow-300 hover:bg-yellow-400 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ProductDetail;
