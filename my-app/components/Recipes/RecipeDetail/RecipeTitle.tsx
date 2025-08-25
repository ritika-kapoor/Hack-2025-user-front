"use client"

import BookMarkToggle from './BookMarkToggle';

interface RecipeTitleProps {
    title: string;
    cookingTime: string;
    calories: string;
    // store_recipe?: boolean;
    recipe_id: string;
    description: string;
}

export default function RecipeTitle({ title, cookingTime, calories, description, recipe_id}: RecipeTitleProps) {
    return (
        <div className="self-stretch flex flex-col justify-start items-start gap-5 px-5">
            <div className="self-stretch inline-flex justify-start items-center gap-5">
                <div className="w-80 inline-flex flex-col justify-start items-start gap-2.5">
                    <div className="self-stretch justify-start text-zinc-800 text-2xl font-bold font-['Noto_Sans_JP'] leading-tight">{title}</div>
                    <div className="self-stretch justify-start text-zinc-800 text-sm font-normal font-['Noto_Sans_JP'] leading-tight">調理時間{cookingTime}分 カロリー{calories}kcal</div>
                </div>
                <BookMarkToggle recipe_id={recipe_id}/>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
                <div className="px-2.5 py-2 bg-stone-100 rounded-lg inline-flex justify-center items-center gap-2.5">
                    <div className="w-80 justify-start text-zinc-800 text-sm font-normal font-['Noto_Sans_JP'] leading-tight">{description}</div>
                </div>
            </div>
        </div>
    )
}