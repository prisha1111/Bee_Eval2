import axios from "axios";

// Axios instance
export const axiosClient = axios.create({
    baseURL: 'http://localhost:4000', // Removed unnecessary space after the colon
});

// // Delete message function
// export const deleteMessage = async (id) => {
//     return await axiosClient.delete(`/chat/${id}`); // Proper template literal usage
// };

export const deleteMessage = async (id) => {
    try {
        const response = await axiosClient.delete(`/chat/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting message:', error.message);
        throw error; // Optional: rethrow for higher-level error handling
    }
};
