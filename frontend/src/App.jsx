import './App.css';
import React, { useEffect, useState, useReducer } from 'react';
import AddVocabEntries from './components/addVocabEntry/AddVocabEntries.jsx';
import VocabCard from './components/cards/VocabCard.jsx'
import WordSelection from './components/wordSelection/WordSelection.jsx'
import GlobalEventListener from './components/eventListeners/GlobalEventListener.jsx';
import Header from './components/header/Header.jsx'
import WordRepository from './components/externalRepository/WordRepository.jsx';
import WordsReducer from './state/reducers/wordsReducer.jsx';

function App() {
  const [displayEnglish, setDisplayEnglish] = useState(false);
  const [allSentences, setAllSentences] = useState(false);
  const [words, dispatchWords] = useReducer(
    WordsReducer,
    { data: [], isLoading: true, selectedWord: '', currentIndex: 0 }
  );

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
      const utterance = new SpeechSynthesisUtterance(words.selectedWord.spanish);
      utterance.lang = 'es';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSetWords = (data) => {
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
      handleSpeakWord(words.selectedWord.spanish);
    }
  }, [words.selectedWord]);

  return (
    <div className='header'>
      <WordRepository onSpeak={handleSpeakWord} onSetWords={handleSetWords}></WordRepository>
      <Header ontoggleAllSentences={handleToggleAllSentences} onHideEnglish={handleToggle} ></Header>
      <div className="app">
        {words.isLoading ? <p>Loading...</p> :
          <VocabCard wordInfo={words.selectedWord} wordsLoading={words.isLoading} displayEnglish={displayEnglish} allSentences={allSentences}></VocabCard>
        }
        <WordSelection onNext={handleNext} onToggle={handleToggle} onPrevious={handlePrevious}></WordSelection>
        <AddVocabEntries></AddVocabEntries>
        <GlobalEventListener onNext={handleNext} onToggle={handleToggle} onPrevious={handlePrevious}></GlobalEventListener>
      </div>
    </div>
  );
};

export default App
