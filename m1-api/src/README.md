# Gestion des Auteurs et des Livres via l'Entité `Créations`

## Introduction

Ce projet utilise une architecture de base de données structurée pour gérer les relations entre les auteurs (`authors`) et les livres (`books`). Dans le but de faciliter la gestion de plusieurs auteurs ayant potentiellement des livres reliés à un même nom, nous avons introduit une entité intermédiaire appelée `creations`. Cette entité permet de créer un lien unique entre un auteur et ses œuvres sans se baser uniquement sur des identifiants (IDs) qui peuvent être réassignés.

## Objectifs de l'Architecture

L'architecture avec l'entité `creations` est mise en place pour :
1. **Prévenir les conflits d'identité** entre auteurs : lorsqu'un auteur est supprimé puis recréé, les relations des livres ne se cassent pas.
2. **Assurer la persistance des relations entre livres et auteurs** en liant les livres à l'identité de la création et non à celle de l'auteur directement.
3. **Faciliter l'ajout de nouveaux auteurs sous le même nom** sans affecter les livres existants ou sans créer de duplications accidentelles.

## Structure des Entités

1. **`Author` (Auteur)** : Représente un auteur unique avec ses informations personnelles (nom, bio, photo, etc.).
2. **`Book` (Livre)** : Représente une œuvre littéraire avec des informations telles que le titre, la date de publication, un résumé, etc.
3. **`Creation`** : Entité intermédiaire associée à la fois aux auteurs et aux livres. Elle contient l'identité principale (`nomAuteur`) qui relie un ou plusieurs auteurs à leurs œuvres.

### Relations Inter-Entités

- **Author - Creation** : Chaque auteur est associé à une `creation`. Cette relation assure que chaque auteur est identifié par l'ID de `creation` plutôt que son propre ID. Si un auteur est recréé, la relation peut être conservée en utilisant le même `creation` ID.
  
- **Book - Creation** : Chaque livre est relié à une `creation`. Cela garantit que même si un auteur est supprimé et recréé, les livres restent associés au bon ID `creation`.

### Exemple d'Utilisation

Prenons le cas où nous avons un auteur nommé "Antoine de Saint-Exupéry" avec plusieurs livres.

1. **Création initiale de l'auteur et de ses livres** :
    - Un auteur est créé avec le nom "Antoine de Saint-Exupéry", associé à une `creation` ayant pour nom "Antoine de Saint-Exupéry".
    - Les livres ("Le Petit Prince", "Vol de Nuit") sont également liés à cette `creation`.
  
2. **Suppression et recréation de l'auteur** :
    - Si l'auteur est supprimé puis recréé (par exemple à cause d'une erreur), il sera associé à la même `creation` initiale. Ainsi, les livres restent liés à cet auteur grâce à `creation`.

## Mise en Place du Système de Liaison

Voici un résumé des étapes et des composants impliqués :

1. **Création d'un Auteur** : Lorsqu'un nouvel auteur est créé, le système vérifie si une `creation` avec le même `nomAuteur` existe. Si oui, elle est réutilisée, sinon une nouvelle `creation` est créée.
2. **Création d'un Livre** : Lorsqu'un livre est créé, il est associé à une `creation` existante. Cela permet de lier le livre à l'identité unique définie dans `creations`.
3. **Gestion des Suppressions et Modifications** : Grâce à `creation`, la suppression d'un auteur n'affecte pas les livres associés, car ceux-ci restent liés à l'ID `creation`.

## Pourquoi ce Système est Pratique

1. **Élimination des Doublons** : Si plusieurs auteurs partagent le même nom (par exemple, pour des homonymes), ils peuvent être gérés sans créer de doublons de livres.
2. **Gestion Centralisée** : L'entité `creation` centralise les relations, simplifiant la gestion de données entre livres et auteurs.
3. **Souplesse** : Ce modèle est flexible pour ajouter de nouvelles entités (ex. éditeurs ou genres) qui peuvent être facilement reliées via `creation` si nécessaire.

## Exemple de Schéma ER

```plaintext
+----------------+       +---------------+       +----------------+
|    Author      |       |   Creation    |       |     Book       |
|----------------|       |---------------|       |----------------|
| id             | 1 --- | id            | --- M | id             |
| name           |       | nomAuteur     |       | title          |
| bio            |       +---------------+       | publicationDate|
+----------------+                               | summary        |
                                                 | creationId (FK)|
                                                 +----------------+
```
## Fonctionnalités Futures

1. **Ajout de l'Entité Genre ou Éditeur** : Le modèle est facilement extensible pour ajouter d'autres entités liées à `creation`.
2. **Interface Utilisateur Avancée** : En front, intégrer des options de filtrage basées sur `creation` pour les cas où un utilisateur souhaite afficher tous les livres d'un auteur même si celui-ci a été recréé.

## Conclusion

Le système basé sur l'entité `creation` offre une flexibilité et une robustesse essentielles pour la gestion de données interconnectées. En conservant l'identité unique d'un auteur au travers des suppressions et recréations, ce modèle garantit l'intégrité des relations et facilite la gestion des données de manière évolutive.

