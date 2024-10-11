import React from 'react'

type WordSelectionProps = {
    onNext: () => void,
    onToggle: () => void,
    onPrevious: () => void,
}

const WordSelection = ({ onNext, onToggle, onPrevious }: WordSelectionProps) => {
    return (
        <div className="buttons">
            <button onClick={onNext}>Next Word</button>
            <button onClick={onPrevious}>Previous Word</button>
            <button onClick={onToggle}>Show English</button>
        </div>
    )
}

export default WordSelection;