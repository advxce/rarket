import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Button from '@mui/material/Button';
import './ContactForm.css'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send('service_l3lxus8', 'template_iws1v2t', formData, 'xVHRRtBc-eVswjurv')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);

            }, (err) => {
                console.error('FAILED...', err);

            });

        setFormData({ name: '', email: '', message: '' }); // Очистка формы
    };

    return (
        <div className='main--content-form'>
            <form onSubmit={handleSubmit} className='container--form'>
                <div className='field--container'>
                    <label htmlFor="name">Имя:</label>
                    <input
                        className='field--name'
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='field--container'>
                    <label htmlFor="email">Почта:</label>
                    <input
                        className='field--email'
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='field--container'>
                    <label htmlFor="message">Сообщение:</label>
                    <textarea
                        className='field--message'
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button variant="contained" className='form--btn' type="submit">Отправить</Button>
            </form>
        </div>

    );
};

export default ContactForm;