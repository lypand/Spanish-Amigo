import React, { useState } from 'react';
import './addVocabEntries.css';
import axios from 'axios';
import { VocabEntry } from '../../@types/vocabEntityType';
import { AddVocabEntry, GetVocabEntryDraft } from '../externalRepository/WordRepository';

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
const axiosInstance = axios.create({
  baseURL: baseURL
});

function AddVocabEntries() {

  const [formData, setFormData] = useState(
    {
      spanishWordInput: '',
      englishTranslationInput: '',
      spanishSentenceInput: '',
      englishSentenceInput: '',
    });

  const [englishTranslationCollection, setEnglishTranslationCollectionInput] = useState([] as string[]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const addEnglishTranslation = () => {
    setEnglishTranslationCollectionInput([...englishTranslationCollection, formData.englishTranslationInput]);
    setFormData(prevState => ({
      ...prevState,
      englishTranslationInput: ''
    }));
  }

  const populate = async () => {
    reset();
    var draftEntry = await GetVocabEntryDraft(formData.spanishWordInput);
    if (draftEntry && draftEntry !== {} as VocabEntry) {
      if (draftEntry.spanishWord) {
        setFormData(prevState => ({
          ...prevState,
          spanishWordInput: draftEntry.spanishWord
        }));
      }

      if (draftEntry.englishTranslations) {
        setFormData(prevState => ({
          ...prevState,
          englishTranslationInput: draftEntry.englishTranslations[0]
        }));
      }

      if (draftEntry.sentences) {
        var firstSentence = draftEntry.sentences[0];
        if (firstSentence) {
          setFormData(prevState => ({
            ...prevState,
            englishSentenceInput: firstSentence.english,
            spanishSentenceInput: firstSentence.spanish
          }));
        }
      }
    }
  }

  const reset = () => {
    setFormData({
      spanishWordInput: '',
      englishTranslationInput: '',
      spanishSentenceInput: '',
      englishSentenceInput: '',
    })
    setEnglishTranslationCollectionInput([]);
  }

  const submit = () => {
    const vocabEntry: VocabEntry = {
      spanishWord: formData.spanishWordInput,
      englishTranslations: englishTranslationCollection,
      sentences: [{
        english: formData.englishSentenceInput,
        spanish: formData.spanishSentenceInput,
      }]
    }
    AddVocabEntry(vocabEntry);
    reset();
  }

  return (
    <div className="add_vocab_entries">
      <h1>Input Vocab</h1>
      <div className='multi-input'>

        Spanish:
        <input
          type="text"
          name="spanishWordInput"
          value={formData.spanishWordInput}
          onChange={handleChange}
        />
        <button onClick={populate}>Populate</button>

      </div>
      <div className='multi-input'>
        English:
        <input
          type="text"
          name="englishTranslationInput"
          value={formData.englishTranslationInput}
          onChange={handleChange}
        />
        <button onClick={addEnglishTranslation}>Add EnglishTranslation</button>
      </div>
      <Items collection={englishTranslationCollection}></Items>


      <div className='multi-input'>
        English Sentence:
        <input
          type="text"
          name="englishSentenceInput"
          value={formData.englishSentenceInput}
          onChange={handleChange}
        />
      </div>

      <div className='multi-input'>
        Spanish Sentence:
        <input
          type="text"
          name="spanishSentenceInput"
          value={formData.spanishSentenceInput}
          onChange={handleChange}
        />
      </div>
      <button onClick={reset}>Reset</button>
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default AddVocabEntries;

type ItemProps = {
  collection: string[],
}

const Items = ({ collection }: ItemProps) => {
  return (
    <>
      <ul>
        {collection && collection.length > 0 &&
          collection.map((s, index) => {
            return (
              <li key={index}>{s}</li>
            )
          })
        }
      </ul>
    </>
  )
}