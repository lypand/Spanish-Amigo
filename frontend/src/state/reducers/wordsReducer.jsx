const WordsReducer = (state, action) => {
    switch (action.type) {
        case 'WORDS_FETCH_SUCCESS':
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                selectedWord: action.payload[state.currentIndex]
            }
        case 'WORDS_SELECT_NEXT':
            const nextIndex = calculateNextIndex(state);
            return {
                ...state,
                currentIndex: nextIndex,
                selectedWord: state.data[nextIndex],
            }
        case 'WORDS_SELECT_PREVIOUS':
            const previousIndex = calculatePreviousIndex(state);
            return {
                ...state,
                currentIndex: previousIndex,
                selectedWord: state.data[previousIndex],
            }
        default: throw new Error();
    }
}

const calculateNextIndex = (state) => {
    if (state.currentIndex + 1 < state.data.length) {
        return state.currentIndex + 1;
    }
    return state.currentIndex;
}

const calculatePreviousIndex = (state) => {
    if (state.currentIndex - 1 >= 0) {
        return state.currentIndex - 1;
    }
    return state.currentIndex;
}

export default WordsReducer;