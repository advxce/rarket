import React, { useContext, useEffect, useState } from 'react';
import { Badge, IconButton, styled } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Context } from "../../index";
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, onSnapshot } from 'firebase/firestore';
import { Link } from "react-router-dom";
import './NavBar.css';

function NavBar() {
    const { auth, firestore } = useContext(Context);
    const [user] = useAuthState(auth);
    const [totalValue, setTotalValue] = useState(0);

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Ошибка при входе:', error);
        }
    };

    const logOut = () => {
        auth.signOut();
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    useEffect(() => {
        if (!user) return;

        const productsCollection = collection(firestore, `${user.email}_products`);
        const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
            const productsList = snapshot.docs.map(doc => ({
                docID: doc.id,
                ...doc.data()
            }));
            const total = productsList.reduce((acc, product) => acc + product.totalValue, 0);
            setTotalValue(total);
        }, (error) => {
            console.error("Ошибка при получении данных:", error);
        });

        // Возвращаем функцию для отписки от обновлений
        return () => unsubscribe();
    }, [firestore, user]);

    return (
        <div className='main--navbar'>
            <Link to='/' className='products--nav'>Продукты</Link>
            <Link to='/contacts'>Контакты</Link>

            <Link to='/about' className='products--nav'>О Сайте</Link>
            <div className='container--nav'>
                {user ? (
                    <>
                        <IconButton className='cart--nav' aria-label="cart">
                            <StyledBadge badgeContent={totalValue} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                        <button className='acc--nav' onClick={logOut}>Выйти из аккаунта</button>
                    </>
                ) : (
                    <button className='acc--nav' onClick={handleLogin}>Войти в аккаунт</button>
                )}
            </div>
        </div>
    );
}

export default NavBar;