import Image from "next/image";

interface RecipeImageProps {
    image: string;
}

export default function RecipeImage({ image }: RecipeImageProps) {
    return (
        <Image className="w-full h-96 object-cover" src={image} alt="レシピ画像" width={1000} height={1000}/>
    )
}