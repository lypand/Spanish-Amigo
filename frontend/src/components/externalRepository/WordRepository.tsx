import axios from 'axios';
import { VocabEntry } from '../../@types/vocabEntityType';

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
console.log(import.meta.env.VITE_BACKEND_BASE_URL);
const axiosInstance = axios.create({
    baseURL: baseURL
});

export const Authenticate = async (token: string) => {
    try {
        console.log(token);
        const response = await axiosInstance.post<string>('/Auth/verify-token', token, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        });

        sessionStorage.setItem("token", response.data);
    } catch (error) {
        console.log(error);
    }
}

export const RetrieveWords = async (): Promise<VocabEntry[]> => {
    try {
        const response = await axiosInstance.get<VocabEntry[]>('/VocabEntries', {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const AddVocabEntry = async (vocabEntry: VocabEntry) => {
    try {
        await axiosInstance.post('/VocabEntries', [vocabEntry], {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        })
    }

    catch (error) {
        console.log(error);
    }
}

export const GetVocabEntryDraft = async (spanishWord: string): Promise<VocabEntry> => {
    try {
        var response = await axiosInstance.get<VocabEntry>(`/DraftVocabEntries/${spanishWord}`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
        })
        return response.data;
    }

    catch (error) {
        console.log(error);
        return {} as VocabEntry;
    }
}