import React, { useState, useEffect } from 'react';
import { axiosClient, deleteMessage } from '../utils/axiosClient'; // Import axiosClient

const Chat = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axiosClient.get('/chat'); // Adjust the URL as needed
            setMessages(response.data);
        };
        fetchMessages();
    }, []);

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            const response = await axiosClient.post('/chat', { message: inputMessage });
            setMessages([...messages, response.data]); // Add the new message to the state
            setInputMessage(''); // Clear input
        }
    };

    const handleDeleteMessage = async (id) => {
        console.log('Attempting to delete message with ID:', id); // Log the ID
        try {
            await deleteMessage(id); // Call the delete function
            setMessages(messages.filter(msg => msg._id !== id)); // Update the state
            console.log('Message deleted successfully'); // Log success
        } catch (error) {
            console.error('Error deleting message:', error); // Log any errors
        }
    };

    return (
        <div className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-65 h-95 flex flex-col">
            <div className="flex-grow overflow-y-auto">
                {messages.map((msg) => (
                    <div key={msg._id} className="p-2 bg-gray-200 rounded mb-2 flex justify-between items-center">
                        <span>{msg.message}</span>
                        <button 
                            onClick={() => handleDeleteMessage(msg._id)} 
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="border border-gray-300 rounded-l-lg p-2 flex-grow"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white rounded-r-lg p-2"
                >
                    Send
                </button>
                <button onClick={onClose} className="ml-2 text-red-500">Close</button>
            </div>
        </div>
    );
};

export default Chat;