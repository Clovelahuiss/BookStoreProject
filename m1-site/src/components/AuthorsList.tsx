"use client";

import React from 'react';
import styles from './AuthorsList.module.css';
import { Author } from '../models/Author';

interface AuthorsListProps {
    authors: Author[];
}

const AuthorsList: React.FC<AuthorsListProps> = ({ authors }) => {
    return (
        <div className={styles.authorsContainer}>
            {authors.map((author) => (
                <div key={author.id} className={styles.authorCard}>
                    <img
                        src={author.photo || 'https://via.placeholder.com/100'}
                        alt={author.name}
                        className={styles.authorPhoto}
                    />
                    <div className={styles.authorName}>{author.name}</div>
                    <div className={styles.authorDetails}>
                        <p>Livres écrits : {author.bookCount || 0}</p>
                        <p>Note moyenne : {author.averageRating || 'N/A'}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AuthorsList;
