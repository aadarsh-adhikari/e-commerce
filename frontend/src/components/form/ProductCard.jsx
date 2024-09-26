import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartButton from './CartButton';

const ProductCard = ({ productcard }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-4 my-12">
        {productcard.map((product) => (
          <div className="flex flex-col h-full" key={product._id}>
            <Link
              to={`/product/${product.slug}`}
              className="group  p-2 flex-grow flex flex-col" // Make it a flex container
            >
              <div className="relative overflow-hidden rounded-md flex-grow">
                <img
                  src={`http://localhost:3000/product/product-photo/${product._id}`}
                  alt={product.name || 'Product Image'}
                  className="h-80 w-full group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/path/to/fallback-image.jpg';
                  }}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h5 className="text-lg font-semibold text-center flex-grow">
                  {product.name}
                </h5>
                <p className="text-sm text-gray-600 text-center mt-1">
                  By <Link to={`/author/${encodeURIComponent(product.author)}`} className="text-blue-500 hover:underline">{product.author}</Link>
                </p>
                <p className="text-xl font-semibold text-center mt-3">
                  Rs.{product.price}
                </p>
              </div>
            </Link>
            {/* Add to Cart button outside the Link */}
            <div className="mt-2">
              <CartButton 
                item={product} 
                cartStyle="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-200 w-full" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
