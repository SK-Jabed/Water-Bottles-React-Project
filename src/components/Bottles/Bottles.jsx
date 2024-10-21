import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css"
import { addToLocalStorage, getStoreCart, removeFromLocalStorage } from "../../Utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch("bottles.json")
        .then(res => res.json())
        .then(data => setBottles(data))
    }, [])

    // Load cart From Local Storage 
    useEffect(() => {
        console.log(bottles.length);
        if (bottles.length) {
            const storeCart = getStoreCart();
            console.log(storeCart, bottles);

            const savedCart = [];
            for (const id of storeCart) {
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                if (bottle) {
                    savedCart.push(bottle)
                }
            }
            console.log("saved cart", savedCart);
            setCart(savedCart);
        }
    }, [bottles])

    const handleAddToCart = bottle => {
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLocalStorage(bottle.id);
    }

    const handleRemoveFromCart = id => {
        // Remove from Visual Cart
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);
        // Remove From Local Storage 
        removeFromLocalStorage(id);
    }

    
    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
            
            <div className="bottle-container">
                {
                    bottles.map(bottle => <Bottle 
                        key={bottle.id} 
                        bottle={bottle}
                        handleAddToCart={handleAddToCart}></Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;