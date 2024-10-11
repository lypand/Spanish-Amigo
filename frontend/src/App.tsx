import './App.css';
import React, { useEffect, useState, useReducer } from 'react';
import AddVocabEntries from './components/addVocabEntry/AddVocabEntries.tsx';
import VocabCard from './components/cards/VocabCard.tsx'
import WordSelection from './components/wordSelection/WordSelection.tsx'
import GlobalEventListener from './components/eventListeners/GlobalEventListener.tsx';
import Header from './components/header/Header.tsx'
import WordRepository from './components/externalRepository/WordRepository.tsx';
import WordsReducer, { State } from './state/reducers/wordsReducer.tsx';
import { VocabEntry } from "./@types/vocabEntityType";

function App() {
  const [displayEnglish, setDisplayEnglish] = useState(false);
  const [allSentences, setAllSentences] = useState(false);

  const wordInitState: State = {
    data: [],
    isLoading: true,
    selectedWord: null,
    currentIndex: 0,
  };

  const [words, dispatchWords] = useReducer(WordsReducer, wordInitState);

  const handleNext = () => {
    dispatchWords({
      type: 'WORDS_SELECT_NEXT',
    })
  };

  const handlePrevious = () => {
    dispatchWords({
      type: 'WORDS_SELECT_PREVIOUS',
    })
  };

  const handleSpeakWord = () => {
    if (words.data.length !== 0) {
      const utterance = new SpeechSynthesisUtterance(words.selectedWord?.spanishWord);
      utterance.lang = 'es';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSetWords = (data: VocabEntry[]) => {
    dispatchWords({
      type: 'WORDS_FETCH_SUCCESS',
      payload: data,
    });
  }

  const handleToggle = () => {
    setDisplayEnglish(previous => !previous);
  };

  const handleToggleAllSentences = () => {
    setAllSentences(previous => !previous);
  }

  useEffect(() => {
    if (words.data.length !== 0) {
      handleSpeakWord();
    }
  }, [words.selectedWord]);

  return (
    <div className='header'>
      <WordRepository onSpeak={handleSpeakWord} onSetWords={handleSetWords}></WordRepository>
      <Header ontoggleAllSentences={handleToggleAllSentences} onHideEnglish={handleToggle} ></Header>
      <div className="app">
        {words.isLoading ? <p>Loading...</p> :
          <VocabCard wordInfo={words.selectedWord} displayEnglish={displayEnglish}></VocabCard>
        }
        <WordSelection onNext={handleNext} onToggle={handleToggle} onPrevious={handlePrevious}></WordSelection>
        <AddVocabEntries></AddVocabEntries>
        <GlobalEventListener onNext={handleNext} onToggle={handleToggle} onPrevious={handlePrevious}></GlobalEventListener>
      </div>
    </div>
  );
};

export default App
