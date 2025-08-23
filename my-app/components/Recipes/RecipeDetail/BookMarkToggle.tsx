import { Bookmark } from "lucide-react";
import { useState } from "react";

interface BookMarkToggleProps {
    store_recipe: boolean;
}

export default function BookMarkToggle({ store_recipe }: BookMarkToggleProps) {
    const [isBookMarked, setIsBookMarked] = useState(store_recipe);
    return (
        <div>
            <button onClick={() => setIsBookMarked(!isBookMarked)}>
                <Bookmark className={`w-10 h-10 ${isBookMarked ? "fill-yellow-500 text-yellow-500" : "stroke-black fill-transparent"}`} />
            </button>
        </div>
    )
}