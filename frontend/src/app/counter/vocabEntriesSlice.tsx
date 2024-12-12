import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RetrieveWords } from '../../components/externalRepository/WordRepository';
import { VocabEntry } from '../../@types/vocabEntityType';


const vocabEntriesInitialState = {
    data: [] as VocabEntry[],
    isLoading: true,
    selectedWord: null as VocabEntry | null,
    currentIndex: 0,
}

const vocabEntriesSlice = createSlice({
    name: 'vocabEntries',
    initialState: vocabEntriesInitialState,
    reducers: {
        selectNextWord: (state) => {
            state.currentIndex = getNextIndex(state.currentIndex, state.data.length, 'next');
            state.selectedWord = state.data[state.currentIndex];
        },
        selectPreviousWord: (state) => {
            state.currentIndex = getNextIndex(state.currentIndex, state.data.length, 'prev');
            state.selectedWord = state.data[state.currentIndex];
        },
        addCustomWord: (state, action: PayloadAction<VocabEntry>) => {
            state.data.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(retrieveVocabEntriesAsync.fulfilled, (state, action: PayloadAction<VocabEntry[]>) => {
                state.data = action.payload;
                state.isLoading = false;
                state.selectedWord = action.payload[state.currentIndex] || null;
            })
    }
});


export const retrieveVocabEntriesAsync = createAsyncThunk(
    "vocabEntries/vocabEntriesAsync",
    async () => {
        console.log("Retrieving words");
        const response = await RetrieveWords();
        return response;
    }
);

const getNextIndex = (currentIndex: number, length: number, direction: 'next' | 'prev') => {
    if (direction === 'next') {
        return currentIndex + 1 < length ? currentIndex + 1 : 0; // Wrap around to 0 if at the end
    } else {
        return currentIndex - 1 >= 0 ? currentIndex - 1 : length - 1; // Wrap around to the last item if at the start
    }
};

export const { addCustomWord, selectNextWord, selectPreviousWord } = vocabEntriesSlice.actions;
export default vocabEntriesSlice.reducer;
