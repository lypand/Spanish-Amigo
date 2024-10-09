import React, { useState } from 'react';
import './addVocabEntries.css';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
console.log(import.meta.env.VITE_BACKEND_BASE_URL);
const axiosInstance = axios.create({
  baseURL: baseURL
});

function AddVocabEntries() {

  const [multiWordInput, setMultiWordInput] = useState([]);

  const [formData, setFormData] = useState({
    spanish: '',
    english: '',
    exampleEnglish: '',
    exampleSpanish: '',
    conjugations: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleMultiWordInputChange = (event) => {
    const { value } = event.target;
    const array = value.split(',').map(item => item.trim());
    setMultiWordInput(array);
    console.log(array)
  }

  const populate = async () => {
    try {
      const response = await axiosInstance.get(`/DraftVocabEntries/${formData.spanish}`);
      console.log(response.data);
      setFormData(prevState => ({
        spanish: response.data.spanishWord,
        english: response.data.englishTranslations,
        exampleEnglish: response.data.sentences.englishSentence ?? '',
        exampleSpanish: response.data.sentences.spanishSentence ?? '',
        conjugations: response.data.conjugations ?? []
      }));
    } catch (error) {
      console.error(error);
    }
  }

  const submit = async () => {
    await axiosInstance.post(`/vocab_entries`, {
      ...formData
    }).then(() => {
      setFormData({
        spanish: '',
        english: [],
        exampleEnglish: [],
        exampleSpanish: [],
        conjugations: []
      });
    })
      .catch(error => {
        // handle error
        console.error('Error:', error);
      });
  }

  const submitMultiWord = async () => {
    for (let word of multiWordInput) {
      const draftResponse = await axiosInstance.get(`/draft_vocab_entries?spanish=${word}`);

      await axiosInstance.post(`/vocab_entries`, {
        ...draftResponse.data
      })
        .catch(error => {
          // handle error
          console.error('Error:', error);
        });
    }

    await axiosInstance.post(`/vocab_entries`, {
      ...formData
    }).then(() => {
      setFormData({
        spanish: '',
        english: [],
        exampleEnglish: [],
        exampleSpanish: [],
        conjugations: []
      });
    })
      .catch(error => {
        // handle error
        console.error('Error:', error);
      });
  }

  return (
    <div className="add_vocab_entries">
      <input
        type="text"
        name="spanish"
        value={formData.spanish}
        onChange={handleChange}
      />
      <input
        type="text"
        name="english"
        value={formData.english}
        onChange={handleChange}
      />
      <input
        type="text"
        name="exampleEnglish"
        value={formData.exampleEnglish}
        onChange={handleChange}
      />
      <input
        type="text"
        name="exampleSpanish"
        value={formData.exampleSpanish}
        onChange={handleChange}
      />
      <input
        type="text"
        name="conjugations"
        value={formData.conjugations}
        onChange={handleChange}
      />
      <input
        type="text"
        name="multiWordInput"
        value={multiWordInput}
        onChange={handleMultiWordInputChange}
      />
      <button onClick={populate}>Populate</button>
      <button onClick={submit}>Submit</button>
      <button onClick={submitMultiWord}>Submit Multi Word Input</button>
    </div>
  );
}

export default AddVocabEntries;