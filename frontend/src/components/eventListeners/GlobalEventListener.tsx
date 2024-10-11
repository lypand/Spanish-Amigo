import React, { useEffect } from 'react';

type GlobalEventListenerProps = {
    onNext: () => void;
    onToggle: () => void;
    onPrevious: () => void;
}

const GlobalEventListener = ({ onNext, onToggle, onPrevious }: GlobalEventListenerProps) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(event);
            if (event.code === 'ArrowRight') {
                onNext();
            }
            if (event.code === 'ArrowLeft') {
                onPrevious();
            }
            if (event.code === 'Space') {
                onToggle();
            }
            if (event.code === 'ArrowUp') {
                onToggle();
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