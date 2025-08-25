import { NextResponse } from "next/server";

export async function getRecipeDetail(id: string) {

    if (!id) {
        return NextResponse.json({ message: "IDが必須です" }, { status: 400 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/recipes/${id}`);

    if (!response.ok) {
        return NextResponse.json({ message: "レシピが見つかりません"}, { status: 404});
    }

    const recipe = await response.json();
    return recipe;
}