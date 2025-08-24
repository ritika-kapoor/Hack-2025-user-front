export interface Recipe {
    id: number;
    title: string;
    description: string;
    image: string;
    ingredients: { name: string; amount: string }[];
    steps: { description: string }[];
    store_recipe?: boolean;
    cookingTime: string;
    calories: string;
    cookingPoint: string;
    store_date: string;
}