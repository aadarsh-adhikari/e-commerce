import React, { useState } from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../components/auth/Cart";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart(); // Retrieve cart items from context
  const [prices, setPrices] = useState(cart.map(() => 1)); // Initialize prices for each item

  // Handle input change for individual item prices
  const handlePriceChange = (index, value) => {
    const updatedPrices = [...prices];
    updatedPrices[index] = value; // Update the price for the specific item
    setPrices(updatedPrices);
  };

  // Function to handle removing an item from the cart by index
  const handleRemove = (index) => {
    console.log(`Removing item at index: ${index}`); // Log the index of the item being removed
    const updatedCart = cart.filter((_, i) => i !== index); // Filter out the selected item using the index
    const updatedPrices = prices.filter((_, i) => i !== index); // Remove the price for the removed item
    setCart(updatedCart); // Update the cart in context
    setPrices(updatedPrices); // Update the prices
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
    toast.success("Item removed successfully!"); // Show feedback
  };

  // Calculate total price of items in the cart
  const totalPrice = cart.reduce((total, item, index) => total + item.price * prices[index], 0);

  return (
    <div>
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <div className="mt-4">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-4 mb-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">Price: Rs. {item.price}</p>

                    <input
                      type="number"
                      value={prices[index]} // Use the price for this specific item
                      onChange={(e) => handlePriceChange(index, e.target.value)} // Update price for this item
                      min="0"
                    />
                  </div>
                  <button
                    className="text-red-500 hover:underline ml-4"
                    onClick={() => handleRemove(index)} // Call handleRemove with the index
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex justify-between items-center border-t pt-4 mt-4">
                <h2 className="text-xl font-bold">
                  Total Price: Rs. {totalPrice}
                </h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default CartPage;
