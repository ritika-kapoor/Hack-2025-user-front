export interface Recipe {
    id: number;
    title: string;
    description: string;
    image: string;
    ingredients: { id: number; name: string; amount: number | string }[];
    steps: { id: number; description: string }[];
    cookingTime: string;
    calories: string;
    cookingPoint: string;
}