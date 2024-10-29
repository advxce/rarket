import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import './Product.css';

function Product({ id, title, poster, cost, about, onValueChange }) {
    const [state, setState] = useState(false);
    const [value, setValue] = useState(0);

    useEffect(() => {
        onValueChange(value);
    }, [value]);

    const formattedCost = cost.toFixed(2); // Форматируем стоимость

    return (
        <div className='product--card'>
            <div className='content--card'>
                <img src={poster} alt={title} />
                <div className='column--card'>
                    <h3>{title}</h3>
                    <h4>Цена: {formattedCost} Р</h4>
                    {
                        state && value !== 0
                            ? (
                                <div className='container--btn--product gen'>
                                    <div className='cost--btn' onClick={() => setValue(Math.max(value - 1, 0))}>-</div>
                                    <div>{value}</div>
                                    <div className='cost--btn' onClick={() => setValue(value + 1)}>+</div>
                                </div>
                            )
                            : (
                                <div className='container--btn--product def' onClick={() => {
                                    setState(true);
                                    setValue(1);
                                }}>
                                    Добавить в корзину
                                </div>
                            )
                    }
                </div>
            </div>
            <div className='txt--card'>{about.slice(0, 120)}...</div>
        </div>
    );
}

Product.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    about: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
};

export default Product;