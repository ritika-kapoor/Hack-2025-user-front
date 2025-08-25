export interface Recipe {
    recipe_id: string;
    name: string; // titleをnameに変更
    cook_time: number; // cookingTimeをcook_timeに変更し、型をnumberに
    calories: number; // 型をnumberに
    image_url: string; // imageをimage_urlに変更
    ingredients: string[]; // 型をstring[]に変更
    // description, steps, cookingPoint, store_recipe, store_date はバックエンドのレスポンスにないので削除またはオプションにする
    seasonings: string[]; // 新しく追加
}