import { Bookmark } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface BookMarkToggleProps {
    // store_recipe: boolean;
    recipe_id: string;
}

export default function BookMarkToggle({ recipe_id }: BookMarkToggleProps) {
    const [isBookMarked, setIsBookMarked] = useState(false);

    // useEffect(() => {
    //     const fetchBookmarkStatus = async () => {
    //         const token = localStorage.getItem("token");
    //         if (!token) {
    //             return;
    //         }
    //         // 保存しているかどうかの確認API（まだ未実装）
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/bookmarked-recipes?recipe_id=${recipe_id}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`,
    //             },
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             setIsBookMarked(data.isBookMarked); // Assuming the API returns { isBookMarked: boolean }
    //         }
    //     };
    //     fetchBookmarkStatus();
    // }, [recipe_id]);

    const handleBookmarkToggle = useCallback(async() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // ログインしていない時
            return;
        }

        const method = isBookMarked ? "DELETE" : "POST";
        const endpoint = isBookMarked ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/saved-recipes/${recipe_id}` : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/saved-recipes`;

        const response = await fetch(endpoint, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: method === "POST" ? JSON.stringify({ recipe_id: recipe_id }) : undefined,
        });

        if (response.ok) {
            setIsBookMarked(!isBookMarked);
        } else {
            console.error("Failed to toggle bookmark status");
        }
    }, [isBookMarked, recipe_id]);
    
    return (
        <div>
            <button onClick={handleBookmarkToggle}>
                <Bookmark className={`w-10 h-10 ${isBookMarked ? "fill-yellow-500 text-yellow-500" : "stroke-black fill-transparent"}`} />
            </button>
        </div>
    )
}