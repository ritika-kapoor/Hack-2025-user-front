export default function SingleServing () {
    return (
        <div>
            {/* MainRecipesページに遷移したら初期値で本日のレシピは取得し、数日分を押した時に数日分用のAPIを叩く？ */}
            <button className="text-center justify-start text-sm font-bold font-['Work_Sans'] leading-tight transition-all duration-200 ease-in-out hover:underline hover:-translate-y-1 hover:shadow-md">本日分</button>
        </div>
    )
}