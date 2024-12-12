import { configureStore } from '@reduxjs/toolkit'
import vocabEntriesReducer from './counter/vocabEntriesSlice'
import toggleEnglishTranslationsReducer from './counter/configurationSlice'



export const store = configureStore({
    // Pass in the root reducer setup as the `reducer` argument
    reducer: {
        toggleEnglishTranslations: toggleEnglishTranslationsReducer,
        vocabEntries: vocabEntriesReducer,
    }
})

// This is going to return the return types of store.getState
// This will help us when we need to access the state via a selector
export type RootState = ReturnType<typeof store.getState>;
//Useful with async actions 
export type AppDispatch = typeof store.dispatch;