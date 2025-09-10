import { Bookmark } from "lucide-react";
import { useCallback, useState } from "react";

interface BookMarkToggleProps {
    recipe_id: string;
    saved_flg: boolean;
}

export default function BookMarkToggle({ recipe_id, saved_flg }: BookMarkToggleProps) {
    const [isBookMarked, setIsBookMarked] = useState(saved_flg);

    const handleBookmarkToggle = useCallback(async() => {
        const token = localStorage.getItem("token");
        if (!token) {
            // ログインしていない時
            return;
        }

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
        const method = isBookMarked ? "DELETE" : "POST";
        const endpoint = isBookMarked ? `${baseUrl}/api/v1/saved-recipes/${recipe_id}` : `${baseUrl}/api/v1/saved-recipes`;

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