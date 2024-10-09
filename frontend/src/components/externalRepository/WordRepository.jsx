import { useEffect } from 'react';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
console.log(import.meta.env.VITE_BACKEND_BASE_URL);
const axiosInstance = axios.create({
    baseURL: baseURL
});

const WordRepository = ({ onSetWords, onSpeak }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/VocabEntries');
                console.log(response);
                onSetWords(response.data);
                onSpeak();
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return null;
}

export default WordRepository;