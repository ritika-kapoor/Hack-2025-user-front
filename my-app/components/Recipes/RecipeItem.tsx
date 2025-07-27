import { Recipe } from "@/types/Recipe";
import Image from "next/image";
import Link from "next/link";

export default function RecipeItem({ recipe }: { recipe: Recipe }) {
  console.log(recipe);
  return (
    <>
      <Link href={`/MainRecipes/${recipe.id}`}>
        <div className="self-stretch px-4 py-6 flex flex-col justify-start items-start">
          <div className="self-stretch rounded-xl inline-flex items-start gap-x-6">
            <div className="w-[120px] h-[120px] relative rounded-xl overflow-hidden">
              {recipe.image && (
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover rounded-xl"
                />
              )}
            </div>
            <div className="w-56 inline-flex flex-col justify-start items-start gap-4">
              <div className="self-stretch flex flex-col justify-start items-start gap-1">
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="self-stretch justify-start text-slate-500 text-sm font-normal font-['Noto_Sans_JP'] leading-tight">
                    調理時間 {recipe.cookingTime}　{recipe.calories}
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="self-stretch justify-start text-zinc-900 text-base font-bold font-['Noto_Sans_JP'] leading-tight">
                    {recipe.title}
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="self-stretch justify-start text-slate-500 text-sm font-normal font-['Noto_Sans_JP'] leading-tight">
                    {recipe.ingredients.map((ingredient, index) => (
                      <span key={ingredient.id}>
                        {ingredient.name ? ` ${ingredient.name}` : ""}
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
