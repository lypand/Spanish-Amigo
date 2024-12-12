import React, { useState } from 'react';
import './addVocabEntries.css';
import { VocabEntry, CustomVocabWord } from '../../@types/vocabEntityType';
import { AddVocabEntry, GetVocabEntryDraft } from '../externalRepository/WordRepository';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { addCustomWord } from '../../app/counter/vocabEntriesSlice';

function AddVocabEntries() {

  const dispatch = useDispatch<AppDispatch>();

  const initialCustomVocabWord: CustomVocabWord = {
    spanish: '',
    english: '',
    spanishSentence: '',
    englishSentence: '',
  };

  const [customVocabWord, setCustomVocabWord] = useState<CustomVocabWord>(initialCustomVocabWord);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    setCustomVocabWord(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const populate = async () => {
    var draftEntry = await GetVocabEntryDraft(customVocabWord.spanish);

    if (!draftEntry || draftEntry === ({} as VocabEntry)) {
      return;
    };

    const { spanishWord, englishTranslations, sentences } = draftEntry;

    setCustomVocabWord(prevState => ({
      ...prevState,
      spanish: spanishWord || prevState.spanish,
      english: englishTranslations?.[0] || prevState.english,
      spanishSentence: sentences?.[0]?.spanish || prevState.spanishSentence,
      englishSentence: sentences?.[0]?.english || prevState.englishSentence,
    }));
  }

  const reset = () => {
    setCustomVocabWord(initialCustomVocabWord)
  }

  const submit = () => {
    const vocabEntry: VocabEntry = {
      spanishWord: customVocabWord.spanish,
      englishTranslations: [customVocabWord.english],
      sentences: [{
        english: customVocabWord.englishSentence,
        spanish: customVocabWord.spanishSentence,
      }]
    }
    AddVocabEntry(vocabEntry);
    dispatch(addCustomWord(vocabEntry));
    reset();
  }

  return (
    <div className="add_vocab_entries">
      <h1>Input Vocab</h1>
      <button onClick={populate}>Populate</button>
      <InputBox label="Spanish" name='spanish' value={customVocabWord.spanish} onChange={handleChange} />
      <InputBox label="English" name='english' value={customVocabWord.english} onChange={handleChange} />
      <InputBox label="English Sentence" name='englishSentence' value={customVocabWord.englishSentence} onChange={handleChange} />
      <InputBox label="Spanish Sentence" name='spanishSentence' value={customVocabWord.spanishSentence} onChange={handleChange} />
      <button onClick={reset}>Reset</button>
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default AddVocabEntries;


const InputBox = (
  { label, name, value, onChange }:
    { label: string, name: string, value: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className='multi-input'>
      {label}:
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}