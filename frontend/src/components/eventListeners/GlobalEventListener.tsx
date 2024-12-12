import React, { useEffect } from 'react';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { toggleEnglishTranslations } from '../../app/counter/configurationSlice';
import { selectNextWord, selectPreviousWord } from '../../app/counter/vocabEntriesSlice';


const GlobalEventListener = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'ArrowRight') {
                dispatch(selectNextWord());
            }
            if (event.code === 'ArrowLeft') {
                dispatch(selectPreviousWord());
            }
            if (event.code === 'Space') {
                dispatch(toggleEnglishTranslations());
            }
            if (event.code === 'ArrowUp') {
                dispatch(toggleEnglishTranslations());
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });


    return null;
}

export default GlobalEventListener;