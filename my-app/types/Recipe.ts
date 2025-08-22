export interface Recipe {
    id: number;
    title: string;
    description: string;
    image: string;
    ingredients: { id: number; name: string; amount: number | string }[];
    steps: { id: number; description: string }[];
    store_recipe?: boolean;
    cookingTime: string;
    calories: string;
    cookingPoint: string;
    store_date: string;
}