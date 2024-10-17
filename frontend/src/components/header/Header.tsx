import styles from './header.module.scss';
import React from 'react';

type HeaderProps = {
    onHideEnglish: () => void;
}

const Header = ({ onHideEnglish }: HeaderProps) => {
    return (
        <header className={styles.main_header}>
            <div className={styles.main_header_icon}>
                <a className={styles.main_header_brand}>Spanish Amigo</a>
            </div>
            <nav className={styles.main_nav}>
                <div className={styles.main_nav_items_setting}>Settings</div>
                <ul className={styles.main_nav_items}>
                    <li className={styles.main_nav_item}>
                        <a href='#' onClick={onHideEnglish}>Display English</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;