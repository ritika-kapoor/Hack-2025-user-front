// my-app/components/Recipes/store-recipes/store-recipe-select.tsx
import React, { Dispatch, SetStateAction } from "react";

interface StoreRecipeSelectProps {
    setSortOrder: Dispatch<SetStateAction<string>>; // Add this line
}

export default function StoreRecipeSelect({ setSortOrder }: StoreRecipeSelectProps) {
    // 選択ボックスの変更ハンドラ
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSortOrder(selectedValue); // Use setSortOrder instead of sorting here
    };

    return (
        <select onChange={handleSelectChange}>
            <option value="newest">新しい順</option>
            <option value="oldest">古い順</option>
        </select>
    );
}