export interface Creation {
    id: number;
    nomAuteur: string;
}

export type NewCreation = Omit<Creation, 'id'>;
