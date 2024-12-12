import './App.css';
import React, { useEffect } from 'react';
import AddVocabEntries from './components/addVocabEntry/AddVocabEntries.tsx';
import VocabCard from './components/cards/VocabCard.tsx'
import WordSelection from './components/wordSelection/WordSelection.tsx'
import GlobalEventListener from './components/eventListeners/GlobalEventListener.tsx';
import Header from './components/header/Header.tsx'
import { Authenticate } from './components/externalRepository/WordRepository.tsx';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store.tsx';
import { retrieveVocabEntriesAsync } from './app/counter/vocabEntriesSlice.tsx';

function App() {
  const vocabEntries = useSelector((state: RootState) => state.vocabEntries);
  const dispatch = useDispatch<AppDispatch>();

  const handleSpeakWord = () => {
    if (vocabEntries.data.length !== 0) {
      const utterance = new SpeechSynthesisUtterance(vocabEntries.selectedWord?.spanishWord);
      utterance.lang = 'es';
      window.speechSynthesis.speak(utterance);
    }
  };


  const authenticationFlow = async (googleResponse: CredentialResponse) => {
    await Authenticate(googleResponse.credential || '');
  }

  useEffect(() => {
    if (vocabEntries.data.length !== 0) {
      handleSpeakWord();
    }
  }, [vocabEntries.selectedWord]);

  useEffect(() => {
    dispatch(retrieveVocabEntriesAsync())
  }, [dispatch]);

  return (
    <div className='header'>
      <GoogleLogin onSuccess={(googleResponse: CredentialResponse) => {
        authenticationFlow(googleResponse);
      }
      }></GoogleLogin>
      <Header></Header>
      <div className="app">
        {vocabEntries.isLoading ? <p>Loading...</p> :
          <VocabCard wordInfo={vocabEntries.selectedWord}></VocabCard>
        }
        <WordSelection ></WordSelection>
        <AddVocabEntries></AddVocabEntries>
        <GlobalEventListener></GlobalEventListener>
      </div>
    </div>
  );
};

export default App;

