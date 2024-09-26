import React from 'react';
import { useCart } from '../auth/Cart'; 
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const CartButton = ({ item, cartStyle }) => {
  const [cart, setCart] = useCart(); 

  const handleAddToCart = () => {
 
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); 
    //coustom tostify
    const toastId = toast.success(
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Added to cart successfully!</span>
        <Link to="/cart" className='underline text-blue-500 hover:text-blue-300 pl-1'>view cart</Link>
        <button 
          onClick={() => toast.dismiss(toastId)} 
          style={{
            marginLeft: '10px',
            color: '#ffffff',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          
          ✖️
        </button>
       
      </div>,
      {
        duration: 3000, 
        position: 'top-center',
      }
    );
  };

  return (
    <button className={cartStyle} onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};

export default CartButton;
