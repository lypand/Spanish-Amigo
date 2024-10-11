import React, { useState } from 'react';
import './addVocabEntries.css';
import axios from 'axios';
import { VocabEntry } from '../../@types/vocabEntityType';

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
const axiosInstance = axios.create({
  baseURL: baseURL
});

function AddVocabEntries() {

  const [formData, setFormData] = useState<VocabEntry>(
    {
      id: 0,
      spanishWord: '',
      englishTranslations: [],
      sentences: [],
      conjugation: [],
    });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }


  const populate = async () => {
    try {
      const response = await axiosInstance.get<VocabEntry>(`/DraftVocabEntries/${formData.spanishWord}`);
      console.log(response.data);
      setFormData(prevState => ({
        id: response.data.id,
        conjugation: response.data.conjugation,
        englishTranslations: response.data.englishTranslations,
        sentences: response.data.sentences,
        spanishWord: response.data.spanishWord
      }));
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="add_vocab_entries">
      <input
        type="text"
        name="spanish"
        value={formData.spanishWord}
        onChange={handleChange}
      />
      <input
        type="text"
        name="english"
        value={formData.englishTranslations}
        onChange={handleChange}
      />
      <input
        type="text"
        name="exampleEnglish"
        value={formData?.sentences[0]?.english}
        onChange={handleChange}
      />
      <input
        type="text"
        name="exampleSpanish"
        value={formData?.sentences[0]?.spanish}
        onChange={handleChange}
      />
      <button onClick={populate}>Populate</button>
    </div>
  );
}

export default AddVocabEntries;