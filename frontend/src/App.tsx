import './App.css';
import React, { useEffect, useState, useReducer } from 'react';
import AddVocabEntries from './components/addVocabEntry/AddVocabEntries.tsx';
import VocabCard from './components/cards/VocabCard.tsx'
import WordSelection from './components/wordSelection/WordSelection.tsx'
import GlobalEventListener from './components/eventListeners/GlobalEventListener.tsx';
import Header from './components/header/Header.tsx'
import { Authenticate, RetrieveWords } from './components/externalRepository/WordRepository.tsx';
import WordsReducer, { State } from './state/reducers/wordsReducer.tsx';
import { VocabEntry } from "./@types/vocabEntityType";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

function App() {
  const [displayEnglish, setDisplayEnglish] = useState(false);

  const wordInitState: State = {
    data: [],
    // data: [{
    //   id: 1,
    //   spanishWord: 'Abrir',
    //   englishTranslations: ['open'],
    //   sentences: [{
    //     english: 'Can you open the door',
    //     spanish: 'Puedes abrir la purta por favor'
    //   }],
    // }],
    isLoading: true,
    selectedWord: null,
    // selectedWord: {
    //   id: 1,
    //   spanishWord: 'Abrir',
    //   englishTranslations: ['open'],
    //   sentences: [{
    //     english: 'Can you open the door',
    //     spanish: 'Puedes abrir la purta por favor'
    //   }]
    // },
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

  const handleToggle = () => {
    setDisplayEnglish(previous => !previous);
  };

  const authenticationFlow = async (googleResponse: CredentialResponse) => {
    await Authenticate(googleResponse.credential || '');
  }

  const retrieveWords = async () => {
    var vocabEntries = await RetrieveWords();
    dispatchWords({
      type: 'WORDS_FETCH_SUCCESS',
      payload: vocabEntries,
    });
  }

  useEffect(() => {
    if (words.data.length !== 0) {
      handleSpeakWord();
    }
  }, [words.selectedWord]);


  useEffect(() => {
    retrieveWords()
  }, []);

  return (
    <div className='header'>
      <GoogleLogin onSuccess={(googleResponse: CredentialResponse) => {
        authenticationFlow(googleResponse);
      }
      }></GoogleLogin>
      <Header onHideEnglish={handleToggle} ></Header>
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
