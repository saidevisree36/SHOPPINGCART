import React, { useState, useEffect } from "react";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];
const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

function ShoppingCartApp() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(total);
    manageFreeGift(total);
  }, [cart]);

  const manageFreeGift = (total) => {
    const giftInCart = cart.find((item) => item.id === FREE_GIFT.id);
    if (total >= THRESHOLD && !giftInCart) {
      setCart([...cart, { ...FREE_GIFT, quantity: 1 }]);
    } else if (total < THRESHOLD && giftInCart) {
      setCart(cart.filter((item) => item.id !== FREE_GIFT.id));
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Shopping Cart</h1>
      <h3>Products</h3>
        <div className="container" >
      <div >
        {PRODUCTS.map((product) => (
          <div className="box-container" key={product.id} style={{ marginBottom: "10px" }}>
            <h1 className="product">{product.name} </h1> 
              <p className="product">₹{product.price}
            </p>
            <button className="button" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
            </div>

      <h3>Cart Summary </h3>
      <div>
        {cart.length === 0 ? (
        <div className="cart-summary">
          <p className="cart-paragraph">Cart is empty</p>
        <p className="cart"> Add some products to see them here!</p>
            </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} style={{ marginBottom: "10px" }}>
                <h1 className="cart-items">Cart items</h1>
                <div className="cart-item-container">
                    <h1 className="item-name">{item.name} </h1>
                    <div className="price-button-container">
                    <p> ₹{item.price} x {item.quantity}= ₹{subtotal}</p>
              
              {item.id !== FREE_GIFT.id && (
                <div className="button-container">
                  <button className="button-green" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  <p className="item-quantity">{item.quantity}</p>
                    <button className="button-red" onClick={() => updateQuantity(item.id, -1)}>-</button>
                </div>
                
              )}
                </div>        
                    </div>
            </div>
          ))
        )}
      </div>
              
      <div className="subtotal-container">
      <h3 className="subtotal-heading">Subtotal: ₹{subtotal}</h3>
        <hr/>
          <div className="pointadd-container">
        <p>Add ₹1000 more to get a free wirless mouse</p>
      <div style={{ width: "100%", background: "#ddd", height: "20px", marginTop: "10px" }}>
        <div
          style={{
            width: `${Math.min((subtotal / THRESHOLD) * 100, 100)}%`,
            background: "green",
            height: "100%",
          }}
        ></div>
          </div>
      </div>
          
      {subtotal >= THRESHOLD && <p>Congratulations! You've unlocked a free gift!</p>}
    </div>
        </div>
  );
}

export default ShoppingCartApp;

