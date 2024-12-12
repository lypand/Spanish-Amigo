import { createSlice } from '@reduxjs/toolkit'


const configurationInitialState = {
    showEnglishTranslation: true,
}

const configurationSlice = createSlice({
    name: 'toggleEnglishTranslation',
    initialState: configurationInitialState,
    reducers: {
        toggleEnglishTranslation: (state) => {
            state.showEnglishTranslation = !state.showEnglishTranslation;
        },
    }
});

export const { toggleEnglishTranslation: toggleEnglishTranslations } = configurationSlice.actions;
export default configurationSlice.reducer;
