import { useDispatch } from 'react-redux';
import styles from './header.module.scss';
import React from 'react';
import { AppDispatch } from '../../app/store';
import { toggleEnglishTranslations } from '../../app/counter/configurationSlice';

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <header className={styles.main_header}>
            <div className={styles.main_header_icon}>
                <a className={styles.main_header_brand}>Spanish Amigo</a>
            </div>
            <nav className={styles.main_nav}>
                <div className={styles.main_nav_items_setting}>Settings</div>
                <ul className={styles.main_nav_items}>
                    <li className={styles.main_nav_item}>
                        <a href='#' onClick={() => dispatch(toggleEnglishTranslations())}>Display English</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
