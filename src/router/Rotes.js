import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "../components/products/Products";
import ContactForm from "../components/Contact/ContactForm";
import About from "../components/About/About";

function AppRoutes() {
    return (

            <Routes>
                <Route path='/' element={<Products />} />
                <Route path='/contacts' element={<ContactForm />} />
                <Route path='/about' element={<About/>} />
            </Routes>

    );
}

export default AppRoutes;