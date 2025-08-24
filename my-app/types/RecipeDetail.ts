export interface RecipeDetail {
    id: string; // recipe_id に合わせてstringに変更
    title: string;
    description: string; // APIレスポンスにauthor_commentがないため、descriptionの扱いを調整するか削除
    image: string; // APIレスポンスにimageがないため、仮の値にするか削除
    ingredients: { name: string; amount: string }[]; // string[]からオブジェクトの配列に変更
    steps: { description: string }[]; // APIレスポンスにstepsがないため、仮の値にするか削除
    store_recipe?: boolean; // APIレスポンスにないため、仮の値にするか削除
    cookingTime: string; // cook_time に合わせてstringに変更
    calories: string; // calories に合わせてstringに変更
    cookingPoint: string; // APIレスポンスにないため、仮の値にするか削除
}

export interface RecipeApiResponse {
    data: {
        recipe: {
            recipe_id: string;
            name: string;
            author_comment: string;
            cook_time: number;
            calories: number;
            total_price: number;
            cooking_point: string;
        };
        ingredients: {
            id: number;
            name: string;
            display_order: number;
            amount_text: string;
        }[];
        seasonings: {
            id: number;
            name: string;
            display_order: number;
            amount_text: string;
        }[];
        steps: {
            id: number;
            instruction: string;
            step_number: number;
        }[];
    };
}