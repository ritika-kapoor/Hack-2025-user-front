"use client"
import { useState, useEffect } from 'react';

interface RefrigeratorIngredient {
    id: number;
    name: string;
    amount: string | number;
}

export default function Refrigerator() {
    const [refrigeratorIngredients, setRefrigeratorIngredients] = useState<RefrigeratorIngredient[]>([]);

    useEffect(() => {
        const storedIngredients = localStorage.getItem("refrigeratorIngredients");
        if (storedIngredients) {
            setRefrigeratorIngredients(JSON.parse(storedIngredients));
        } else {
            // Initialize with dummy data if not present
            const dummyData = [
                {id: 1, name: "鶏肉", amount: 200},
                {id: 2, name:"卵", amount: 2},
                {id: 3, name:"ゴーヤ", amount:1}
            ];
            localStorage.setItem("refrigeratorIngredients", JSON.stringify(dummyData));
            setRefrigeratorIngredients(dummyData);
        }
    }, []);

    if (!refrigeratorIngredients || refrigeratorIngredients.length === 0) {
        return null;
    }

    return (
        <div className="self-stretch px-5 flex flex-col justify-start items-start gap-5">
            <div className="text-zinc-800 text-xl font-bold font-['Noto_Sans_JP'] leading-tight">冷蔵庫の材料</div>
            <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch flex flex-col justify-start items-start">
                    {refrigeratorIngredients.map((ingredient) => (
                        <div key={ingredient.id} className="self-stretch py-2 border-b border-zinc-800 inline-flex justify-between items-center gap-2">
                            <div className="text-zinc-800 text-sm font-normal font-['Noto_Sans_JP'] leading-tight">{ingredient.name}</div>
                            <div className="text-zinc-800 text-sm font-normal font-['Noto_Sans_JP'] leading-tight">{ingredient.amount}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}