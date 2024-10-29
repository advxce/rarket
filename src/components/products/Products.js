import React, {useContext, useEffect, useState} from 'react';
import { products } from "../../utils/products";
import Product from "./Product";
import { setDoc, doc } from "firebase/firestore";
import { Context } from "../../index";
import { useAuthState } from "react-firebase-hooks/auth";
import './products.css'

function Products() {
    const { firestore } = useContext(Context);
    const [totalValue, setTotalValue] = useState(0);
    const [totalValueCost, setTotalValueCost] = useState(0);
    const [productValues, setProductValues] = useState({});
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

    const updateTotalValue = (id, newValue, cost) => {
        setProductValues(prev => ({
            ...prev,
            [id]: newValue
        }));

        const previousValue = productValues[id] || 0;
        const difference = newValue - previousValue;
        setTotalValueCost(prevTotalCost => prevTotalCost + difference * cost);
        setTotalValue(prevTotal => prevTotal + difference);
    };

    const addProductToFirestore = async () => {
        if (!user) {
            console.error("User not authenticated");
            return;
        }

        try {
            const productDocRef = doc(firestore, `${user.email}_products`, 'cart');
            await setDoc(productDocRef, {
                totalValue,
                totalValueCost,
                productValues,
            }, { merge: true });
            console.log("Products updated successfully");
        } catch (error) {
            console.error("Error updating products: ", error);
        }
    };

    useEffect(()=>{
        addProductToFirestore()
    },[totalValue])

    return (
        <div>
            <h1 className='result-cost--products'>Общая стоимость: {totalValueCost.toFixed(2)} p</h1>
            <div className='products--card'>

                {products.map(product => (
                    <Product
                        key={product.id}
                        cost={product.cost}
                        about={product.about}
                        id={product.id}
                        title={product.title}
                        poster={product.poster}
                        onValueChange={(value) => updateTotalValue(product.id, value, product.cost)}
                    />
                ))}
                {/*<button onClick={addProductToFirestore}>Сохранить в корзину</button>*/}
            </div>
        </div>

    );
}

export default Products;