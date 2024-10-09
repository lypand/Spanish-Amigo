const WordSelection = ({ onNext, onToggle, onPrevious }) => {
    return (
        <div className="buttons">
            <button onClick={onNext}>Next Word</button>
            <button onClick={onPrevious}>Previous Word</button>
            <button onClick={onToggle}>Show English</button>
        </div>
    )
}

export default WordSelection;