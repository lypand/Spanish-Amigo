import { VocabEntry } from "../../@types/vocabEntityType";


export type State = {
    data: VocabEntry[];
    currentIndex: number;
    isLoading: boolean;
    selectedWord: VocabEntry | null;
}

type Action =
    | { type: 'WORDS_FETCH_SUCCESS'; payload: VocabEntry[] }
    | { type: 'WORDS_SELECT_NEXT' }
    | { type: 'WORDS_SELECT_PREVIOUS' };


const WordsReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'WORDS_FETCH_SUCCESS':
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                selectedWord: action.payload[state.currentIndex] || null,
            };
        case 'WORDS_SELECT_NEXT':
            const nextIndex = calculateNextIndex(state);
            return {
                ...state,
                currentIndex: nextIndex,
                selectedWord: state.data[nextIndex] || null,
            };
        case 'WORDS_SELECT_PREVIOUS':
            const previousIndex = calculatePreviousIndex(state);
            return {
                ...state,
                currentIndex: previousIndex,
                selectedWord: state.data[previousIndex] || null,
            };
        default:
            throw new Error('Unhandled action type');
    }
};

const calculateNextIndex = (state: State): number => {
    if (state.currentIndex + 1 < state.data.length) {
        return state.currentIndex + 1;
    }
    return state.currentIndex;
};

const calculatePreviousIndex = (state: State): number => {
    if (state.currentIndex - 1 >= 0) {
        return state.currentIndex - 1;
    }
    return state.currentIndex;
};

export default WordsReducer;
