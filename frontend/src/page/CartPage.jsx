import React, { useState } from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../components/auth/Cart";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart(); 
  const [prices, setPrices] = useState(cart.map(() => 1));

  const handlePriceChange = (index, value) => {
    const updatedPrices = [...prices];
    updatedPrices[index] = Math.max(1, value); 
    setPrices(updatedPrices);
  };

  const handleRemove = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    const updatedPrices = prices.filter((_, i) => i !== index);
    setCart(updatedCart);
    setPrices(updatedPrices);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed successfully!");
  };

  const totalPrice = cart.reduce(
    (total, item, index) => total + item.price * prices[index],
    0
  );

  return (
    <div>
      <Layout>
        <div className="m-4">
          <h1 className="text-2xl text-center font-bold mb-4">Your Cart</h1>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item._id}
                  className="flex gap-3 items-center w-2/4 border-b pb-4 mb-4"
                >
                  <div className="">
                    <img
                      src={`${import.meta.env.VITE_API_URL}/product/product-photo/${item._id}`} 
                      alt={item.name || "Product Image"} 
                      className="h-40 w-40 "
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p>Enter quantity:</p>
                    <input
                      type="number"
                      value={prices[index]}
                      onChange={(e) =>
                        handlePriceChange(index, parseInt(e.target.value, 10))
                      } 
                      min="1"
                      className="w-16 text-center border-blue-200 border-solid border-2"
                    />

                    <div className="">
                      <p className="text-gray-600">Price: Rs. {item.price}</p>

                      <p
                        className="text-red-500 hover:underline w-min cursor-pointer"
                        onClick={() => handleRemove(index)}
                      >
                        Remove
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end items-center border-t pt-4 mt-4">
                <div className="text-right">
                  <h2 className="text-xl font-bold">
                    Total Price: Rs. {totalPrice}
                  </h2>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default CartPage;
