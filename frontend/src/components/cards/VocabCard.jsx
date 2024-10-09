import React from 'react';
import ConjugationTable from '../conjugationTable/ConjugationTable';
import styles from './card.module.scss';

function VocabCard({ wordInfo, displayEnglish }) {

  return (
    <div>
      <div className={styles.card}>
        <div>
          <h1 className={styles.card_header}>{wordInfo.spanish}</h1>
          <div className={styles.card_body}>
            <div className={styles.card_translation}>
              <h2>Translation</h2>
              <ul className={`${displayEnglish ? styles.visible : styles.hidden} ${styles.card_translation_items}`} >
                {wordInfo.englishTranslations.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.card_sentence}>
              <h2>
                Sentence:
              </h2>
              <div className={wordInfo.sentences[0].spanishSentence === undefined ? styles.hidden : styles.visible}>
                <ul className={styles.card_sentence_items}>
                  <li>
                    {wordInfo.sentences[0].spanishSentence}
                  </li>
                  <li>
                    {wordInfo.sentences[0].englishSentence}
                  </li>
                </ul>
              </div>
            </div>
            <div className="conjugation-table-wrapper">
              <ConjugationTable word={wordInfo.spanishWord}></ConjugationTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabCard;
