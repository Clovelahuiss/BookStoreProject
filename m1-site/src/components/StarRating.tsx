// src/components/StarRating.tsx
import React, { useState } from 'react';

interface StarRatingProps {
    rating: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, readonly = false }) => {
    const [hovered, setHovered] = useState(0);

    const handleClick = (star: number) => {
        if (!readonly && onRatingChange) {
            onRatingChange(star);
        }
    };

    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => !readonly && setHovered(star)}
                    onMouseLeave={() => !readonly && setHovered(0)}
                    className={`text-2xl cursor-pointer ${
                        star <= (hovered || rating) ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
