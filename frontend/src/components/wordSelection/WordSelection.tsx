import React from 'react'
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { retrieveVocabEntriesAsync, selectNextWord, selectPreviousWord } from '../../app/counter/vocabEntriesSlice';

const WordSelection = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="buttons">
            <button onClick={() => dispatch(selectNextWord())}>Next Word</button>
            <button onClick={() => dispatch(selectPreviousWord())}>Previous Word</button>
            <button onClick={() => dispatch(retrieveVocabEntriesAsync())}>Load Words</button>
        </div>
    )
}

export default WordSelection;