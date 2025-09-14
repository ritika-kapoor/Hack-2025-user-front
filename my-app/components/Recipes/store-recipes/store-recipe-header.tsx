// my-app/components/Recipes/store-recipes/store-recipe-header.tsx
"use client"
import { Recipe } from "@/types/Recipe";
import StoreRecipeSearch from "./store-recipe-search";
import StoreRecipeSelect from "./store-recipe-select";
import { useEffect, useState } from "react";

interface StoreRecipesHeaderProps {
    recipe: Recipe[];
    setFilteredRecipes: (recipes: Recipe[]) => void;
}

export default function StoreRecipesHeader({ recipe, setFilteredRecipes }: StoreRecipesHeaderProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");

    useEffect(() => {
        let filteredRecipes = [...recipe];

        // 検索
        if (searchTerm) {
            filteredRecipes = filteredRecipes.filter(r =>
                r.name.toLowerCase().includes(searchTerm.toLowerCase()) // titleをnameに変更
            );
        }

        // 並び替え (store_dateはバックエンドにないので一時的に削除)
        // if (sortOrder === "newest") {
        //     filteredRecipes.sort((a, b) => new Date(b.store_date).getTime() - new Date(a.store_date).getTime());
        // } else if (sortOrder === "oldest") {
        //     filteredRecipes.sort((a, b) => new Date(a.store_date).getTime() - new Date(b.store_date).getTime());
        // }
        
        setFilteredRecipes(filteredRecipes);
    }, [searchTerm, sortOrder, recipe, setFilteredRecipes]);

    return (
        <div className="bg-stone-100">
            <div className="self-stretch px-[16px] py-[8px] w-[390px] bg-stone-100 inline-flex justify-between items-center">
                <div className="w-96 relative flex justify-between items-center">
                    <div className="w-6 h-6 relative"></div>
                    <div className="h-6 p-2 bg-white rounded flex justify-end items-center gap-1">
                        <StoreRecipeSelect setSortOrder={setSortOrder}/>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 text-center justify-start text-neutral-900 text-sm font-bold font-['Noto_Sans_JP'] leading-snug">保存リスト</div>
                </div>
            </div>
            <div className="w-full h-10 relative bg-stone-100 flex justify-center items-center">
                <StoreRecipeSearch setSearchTerm={setSearchTerm} />
            </div>
        </div>
    );
}
