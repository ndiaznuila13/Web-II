import { useState, useEffect } from "react";
import { Header } from "./components/header";
import { Footer } from "./components/Footer";
import { Guitar } from "./components/Guitar";
import { db } from "./data/db.js";

export const App = () => {
    function initialCart() {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart());

    function addToCart(guitar) {
        const itemIndex = cart.findIndex((item) => guitar.id === item.id);
        //Si la guitarra aún no está en el carrito → la añade con quantity 1
        if (itemIndex === -1) {
            guitar.quantity = 1;
            setCart([...cart, guitar]);
            //Si ya esta, le suma 1 a su quantity
        } else {
            //Modificar propiedad de forma inmutable
            const updatedCart = [...cart];
            updatedCart[itemIndex].quantity += 1;
            setCart(updatedCart);
        }
    }

    function minusFromCart(guitar) {
        const itemIndex = cart.findIndex((item) => guitar.id === item.id);
        //Si la guitarra está en el carrito
        if (itemIndex !== -1) {
            const updatedCart = [...cart];
            //Si la quantity es mayor a 1, le resta 1
            if (updatedCart[itemIndex].quantity > 1) {
                updatedCart[itemIndex].quantity -= 1;
                setCart(updatedCart);
            } else {
                //Si la quantity es 1, la elimina del carrito
                const filteredCart = updatedCart.filter(
                    (item) => item.id !== guitar.id,
                );
                setCart(filteredCart);
            }
        }
    }

    function removeFromCart(guitar) {
        const filteredCart = cart.filter((item) => item.id !== guitar.id);
        setCart(filteredCart);
    }

    function emptyCart() {
        setCart([]);
    }

    function calculateTotal() {
        //Version mutable
        /*
        let total = 0;
        for (const guitar of cart) {
            total += guitar.price * guitar.quantity;
        }
        */
        //Version inmutable
        let total = cart.reduce(
            (total, guitar) => total + guitar.price * guitar.quantity,
            0,
        );
        return total;
    }

    /*
    function saveCartToLocalStorage() {
        //El estado es asincrono (pero local storage es sincrono, asi q no espera la actualizacion para guardar)
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    */

    //Vigila la variable cart y cuando cambia, ejecuta la funcion
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <>
            <Header
                cart={cart}
                calculateTotal={calculateTotal}
                addToCart={addToCart}
                minusFromCart={minusFromCart}
                removeFromCart={removeFromCart}
                emptyCart={emptyCart}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>
                <div className="row mt-5">
                    {data.map((guitar) => (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    );
};
