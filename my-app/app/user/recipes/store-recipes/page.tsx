import StoreRecipeLists from "@/components/Recipes/store-recipes/store-recipe-lists";
import { Suspense } from "react";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Suspense
                fallback={
                    <div className="flex flex-col justify-center items-center h-screen w-screen absolute top-0 left-0">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        <p className="text-gray-500">Loading...</p>
                    </div>
                }
            >
                <div className="flex flex-col items-center">
                    <StoreRecipeLists/>
                </div>
            </Suspense>
        </div>
    )
}