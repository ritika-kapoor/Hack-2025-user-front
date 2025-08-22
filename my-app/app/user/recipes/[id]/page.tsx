import RecipeDetail from "@/components/Recipes/RecipeDetail/RecipeDetail";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  // console.log(params.id)
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex flex-col justify-center items-center h-screen w-screen absolute top-0 left-0">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <RecipeDetail id={id} />
    </Suspense>
  );
}
