import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartButton from './CartButton';

const ProductCard = ({ productcard }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='flex justify-center'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-4 my-4">
        {productcard.map((product) => (
          <div className="group flex flex-col h-full" key={product._id}>
            <Link
              to={`/product/${product.slug}`}
              className="group p-2 flex-grow flex flex-col" 
            >
              <div className="relative overflow-hidden rounded-md flex-grow">
                <img
                  src={`${import.meta.env.VITE_API_URL}/product/product-photo/${product._id}`}
                  alt={product.name || 'Product Image'}
                  className="h-80 w-full group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/path/to/fallback-image.jpg';
                  }}
                />
              </div>
              <div className="p-2 flex flex-col flex-grow">
                <h5 className="text-lg font-semibold  flex-grow">
                  {product.name}
                </h5>
                <p className="text-sm text-gray-600 mt-1">
                  By <Link to={`/author/${encodeURIComponent(product.author)}`} className="text-blue-500 hover:underline">{product.author}</Link>
                </p>
                <p className="text-xl font-semibold  mt-1">
                  Rs.{product.price}
                </p>
              </div>
            </Link>
            <div>
              <CartButton 
                item={product} 
                cartStyle="bg-blue-600 text-white rounded-lg py-2 px-4 group-hover:bg-blue-400 transition duration-200 w-full" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
