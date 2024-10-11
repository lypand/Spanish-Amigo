import { useEffect } from 'react';
import axios from 'axios';
import { VocabEntry } from '../../@types/vocabEntityType';

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
console.log(import.meta.env.VITE_BACKEND_BASE_URL);
const axiosInstance = axios.create({
    baseURL: baseURL
});


type WordRepositoryProps = {
    onSetWords: (words: VocabEntry[]) => void;
    onSpeak: () => void;
}

const WordRepository = ({ onSetWords, onSpeak }: WordRepositoryProps) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/VocabEntries');
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