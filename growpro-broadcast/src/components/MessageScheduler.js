import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessageScheduler() {
    const [messages, setMessages] = useState([]);
    const [form, setForm] = useState({ groupId: '', text: '', cron: '' });

    useEffect(() => {
        axios.get('http://localhost:5000/messages').then(res => setMessages(res.data));
    }, []);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post('http://localhost:5000/messages', form);
        setForm({ groupId: '', text: '', cron: '' });
        const res = await axios.get('http://localhost:5000/messages');
        setMessages(res.data);
    };

    return (
        <div>
            <h2>Schedule a Message</h2>
            <form onSubmit={handleSubmit}>
                <input name="groupId" placeholder="WhatsApp Group ID" value={form.groupId} onChange={handleChange} required />
                <input name="text" placeholder="Message" value={form.text} onChange={handleChange} required />
                <input name="cron" placeholder="Cron Schedule (e.g. '0 17 * * *')" value={form.cron} onChange={handleChange} required />
                <button type="submit">Schedule Message</button>
            </form>
            <h3>Scheduled Messages</h3>
            <ul>
                {messages.map((msg, i) => (
                    <li key={i}>{msg.text} - {msg.cron}</li>
                ))}
            </ul>
        </div>
    );
}

export default MessageScheduler;