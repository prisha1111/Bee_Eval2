const express = require('express');
const Chat = require('../models/chatModel');
const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Chat.find().sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving messages' });
    }
});

// Post a new message
router.post('/', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }

    try {
        const newMessage = new Chat({ message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error saving message' });
    }
});


// Delete a message by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMessage = await Chat.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting message' });
    }
});
module.exports = router;