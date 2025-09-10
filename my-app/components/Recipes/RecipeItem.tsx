import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";

import { Recipe } from "@/types/Recipe";

interface RecipeItemProps {
  recipe: Recipe;
}

export default function RecipeItem({ recipe }: RecipeItemProps) {
  return (
    <>
      <Link href={`/user/recipes/${recipe.recipe_id}`}>
        <div className="self-stretch px-4 py-6 flex flex-col justify-start items-start">
          <div className="self-stretch rounded-xl inline-flex items-start gap-x-6">
            <div className="w-[120px] h-[120px] relative rounded-xl overflow-hidden">
              {recipe.image_url && (
                <Image
                  src={recipe.image_url} // Changed from recipe.image
                  alt={recipe.name} // Changed alt to recipe.name if it exists on Recipe interface
                  fill
                  className="object-cover rounded-xl"
                />
              )}
              <div className="w-10 h-10 absolute bottom-1 right-1">
                <div className="w-10 h-10 left-0 top-0 absolute opacity-40 bg-zinc-800 rounded-full"></div>
                <Bookmark
                  className={`absolute left-[calc(50%-14px)] top-[calc(50%-14px)] ${recipe.saved_flg ? "fill-yellow-500 text-yellow-500" : "text-white"}`}
                  size={30}
                />
              </div>
            </div>
            <div className="w-56 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="self-stretch justify-start text-slate-500 text-sm font-normal font-['Noto_Sans_JP'] leading-tight">
                    調理時間 {recipe.cook_time}分　{recipe.calories}kcal　{recipe.total_price}円
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="self-stretch justify-start text-zinc-900 text-base font-bold font-['Noto_Sans_JP'] leading-tight">
                    {recipe.name}
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="self-stretch justify-start text-slate-500 text-sm font-normal font-['Noto_Sans_JP'] leading-tight">
                    {recipe.ingredients.map((ingredient, index) => (
                      <span key={index}> {/* Changed key to index */} 
                        {ingredient ? ` ${ingredient}` : ""}
                        {index < recipe.ingredients.length - 1 ? "、" : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
