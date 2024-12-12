import React from 'react';
import ConjugationTable from '../conjugationTable/ConjugationTable';
import styles from './card.module.scss';
import { VocabEntry } from '../../@types/vocabEntityType';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

type VocabCardProps = {
  wordInfo: VocabEntry | null,
}


function VocabCard({ wordInfo }: VocabCardProps) {
  var displayEnglishTranslation = useSelector((state: RootState) => state.toggleEnglishTranslations.showEnglishTranslation);

  return (
    <div>
      <div className={styles.card}>
        <div>
          <h1 className={styles.card_header}>{wordInfo?.spanishWord}</h1>
          <div className={styles.card_body}>
            <div className={styles.card_translation}>
              <h2>Translation</h2>
              <ul className={`${displayEnglishTranslation ? styles.visible : styles.hidden} ${styles.card_translation_items}`} >
                {wordInfo?.englishTranslations.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.card_sentence}>
              <h2>
                Sentence:
              </h2>
              <div className={wordInfo?.sentences[0].spanish === undefined ? styles.hidden : styles.visible}>
                <ul className={styles.card_sentence_items}>
                  <li>
                    {wordInfo?.sentences[0].spanish}
                  </li>
                  <li>
                    {wordInfo?.sentences[0].spanish}
                  </li>
                </ul>
              </div>
            </div>
            <div className="conjugation-table-wrapper">
              {/* <ConjugationTable word={wordInfo?.spanishWord || ""}></ConjugationTable> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabCard;
