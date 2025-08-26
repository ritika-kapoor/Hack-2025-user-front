export interface RecipeDetail {
    recipe_id: string;
    name: string;
    author_comment: string;
    cook_time: number;
    calories: number;
    total_price: number;
    cooking_point: string;
    image_url: string;
    created_at: string;
    updated_at: string;
    ingredients: { id: number; name: string; display_order: number; amount_text: string; }[];
    seasonings: { id: number; name: string; display_order: number; amount_text: string; }[];
    steps: { id: number; instruction: string; step_number: number; }[];
    saved_flg: boolean;
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
            image_url: string;
            created_at: string;
            updated_at: string;
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
        saved_flg: boolean;
    };
}