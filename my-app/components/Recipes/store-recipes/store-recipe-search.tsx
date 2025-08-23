// my-app/components/Recipes/store-recipes/store-recipe-search.tsx
import { Search } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface StoreRecipeSearchProps {
    setSearchTerm: Dispatch<SetStateAction<string>>; // Add this line
}

export default function StoreRecipeSearch({ setSearchTerm }: StoreRecipeSearchProps) {
    // 検索入力の変更ハンドラ
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue); // Use setSearchTerm instead of filtering here
    };

    return (
        <div className="w-full h-10 relative bg-stone-100 overflow-hidden flex justify-center items-center">
            <div className="w-80 h-7 bg-white rounded-[10px] flex items-center px-2">
                {/* 検索のマーク */}
                <Search className="w-4 h-4"/>
                <input
                    type="text"
                    onChange={handleSearchChange}
                    placeholder="レシピを検索"
                    className="w-72 h-7 bg-transparent rounded-[10px] outline-none pl-2"
                />
            </div>
        </div>
    );
}