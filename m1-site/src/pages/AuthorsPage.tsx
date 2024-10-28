"use client";

import React, { useState, useEffect } from 'react';
import AuthorsList from '../components/AuthorsList';
import { getAuthors } from '../services/authorService';
import { Author } from '../models/Author';
import styles from './AuthorsPage.module.css';

const AuthorsPage: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(''); // État pour le terme de recherche
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const data = await getAuthors();
                setAuthors(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchAuthors();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredAuthors = authors.filter((author) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return <div>Failed to load authors: {error}</div>;
    }

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Liste des Auteurs</h1>
            <input
                type="text"
                placeholder="Rechercher un auteur"
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.searchInput}
            />
            <AuthorsList authors={filteredAuthors} />
        </div>
    );
};

export default AuthorsPage;
