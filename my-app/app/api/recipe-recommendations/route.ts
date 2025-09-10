import { NextResponse } from "next/server"

// Import the same recipe data structure
const dummyRecipes = [
    {
        id:1,
        title:"カレー",
        description:"家族に人気の夏に食べたいカレーです",
        image: "/images/curry.jpg",
        ingredients:[
            {id:1,name:"バーモンドカレー",amount:200},
            {id:2,name:"にんじん",amount:100},
            {id:3,name:"玉ねぎ",amount:100},
            {id:4,name:"牛肉",amount:300},
            {id:5,name:"水",amount:500},
            {id:6,name:"ジャガイモ",amount:150},
            {id:7,name:"りんご", amount:100}
        ],
        steps:[
            { id:1, description:"牛肉と野菜を一口大に切る。"},
            { id:2, description:"鍋に油を熱し、牛肉と野菜を炒める。"},
            { id:3, description:"水を加えて煮込み、アクを取る。"},
            { id:4, description:"一度火を止め、カレールーを溶かし入れる。"},
            { id:5, description:"再び弱火で煮込む。"}
        ],
        store_recipe:true,
        cookingTime:"40分",
        calories:"600 kcal",
        cookingPoint:"隠し味にチョコレートやコーヒーを加えるとコクが出ます。"
    },
    {
        id:2,
        title:"ミートソースパスタ",
        description:"ひき肉たっぷりの濃厚ミートソースパスタです",
        image: "/images/meat_pasta.jpg",
        ingredients:[
            { id:7, name:"合いびき肉", amount:250 },
            { id:8, name:"玉ねぎ", amount:1/2 },
            { id:9, name:"にんじん", amount:1/2 },
            { id:10, name:"カットトマト缶", amount:400 },
            { id:11, name:"パスタ", amount:200 }
        ],
        steps:[
            { id:1, description:"玉ねぎとにんじんをみじん切りにする。"},
            { id:2, description:"フライパンに油を熱し、ひき肉を炒める。"},
            { id:3, description:"みじん切りにした野菜を加えて炒め、トマト缶と調味料を加えて煮込む。"},
            { id:4, description:"パスタを茹で、ミートソースをかける。"}
        ],
        store_recipe:true,
        cookingTime:"30分",
        calories:"500 kcal",
        cookingPoint:"隠し味に赤ワインを加えると風味がアップします。"
    },
    {
        id:3,
        title:"豚の生姜焼き",
        description:"ご飯が進む定番の豚の生姜焼きです",
        image: "/images/ginger_pork.jpg",
        ingredients:[
            { id:12, name:"豚ロース薄切り肉", amount:300 },
            { id:13, name:"生姜", amount:30 },
            { id:14, name:"醤油", amount:30 },
            { id:15, name:"みりん", amount:30 },
            { id:16, name:"酒", amount:30 }
        ],
        steps:[
            { id:1, description:"豚肉に生姜焼きのタレをもみ込む。"},
            { id:2, description:"フライパンに油を熱し、豚肉を焼く。"},
            { id:3, description:"残りのタレを加えて煮詰める。"}
        ],
        store_recipe:false,
        cookingTime:"15分",
        calories:"450 kcal",
        cookingPoint:"漬け込み時間を長くすると、より味が染み込みます。"
    },
    {
        id:4,
        title:"鮭の塩焼き",
        description:"シンプルで美味しい鮭の塩焼きです",
        image: "/images/salmon.jpg",
        ingredients:[
            { id:17, name:"生鮭切り身", amount:2 },
            { id:18, name:"塩", amount:5 }
        ],
        steps:[
            { id:1, description:"鮭に塩を振って10分ほど置き、水気を拭き取る。"},
            { id:2, description:"魚焼きグリルまたはフライパンで焼く。"}
        ],
        store_recipe:false,
        cookingTime:"10分",
        calories:"200 kcal",
        cookingPoint:"焦げ付かないように、皮から焼くと良いでしょう。"
    },
    {
        id:5,
        title:"鶏肉の唐揚げ",
        description:"ジューシーな鶏肉の唐揚げです",
        image: "/images/fried_chicken.jpg",
        ingredients:[
            { id:19, name:"鶏もも肉", amount:400 },
            { id:20, name:"醤油", amount:20 },
            { id:21, name:"酒", amount:20 },
            { id:22, name:"生姜", amount:10 },
            { id:23, name:"にんにく", amount:5 },
            { id:24, name:"片栗粉", amount:50 }
        ],
        steps:[
            {
                id:1,
                description:"鶏肉を一口大に切り、下味の材料をもみ込む。"
            },
            {
                id:2,
                description:"170℃に熱した油で揚げる。"
            }
        ],
        store_recipe:false,
        cookingTime:"20分",
        calories:"350 kcal",
        cookingPoint:"二度揚げするとよりカリッと仕上がります。"
    }
]

export async function POST(request: Request) {
  try {
    const { ingredients } = await request.json()

    if (!ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: "Ingredients array is required" },
        { status: 400 }
      )
    }

    // Score recipes based on ingredient matches
    const scoredRecipes = dummyRecipes.map(recipe => {
      let score = 0
      const matchedIngredients: string[] = []
      
      // Check each recipe ingredient against detected ingredients
      recipe.ingredients.forEach(recipeIngredient => {
        const ingredientName = recipeIngredient.name.toLowerCase()
        
        // Check for exact matches and partial matches
        ingredients.forEach(detectedIngredient => {
          const detectedName = detectedIngredient.toLowerCase()
          
          if (ingredientName.includes(detectedName) || detectedName.includes(ingredientName)) {
            score += 2 // Exact or close match
            matchedIngredients.push(recipeIngredient.name)
          }
        })
      })
      
      // Bonus for recipes with more matched ingredients
      if (matchedIngredients.length > 0) {
        score += matchedIngredients.length * 0.5
      }
      
      return {
        ...recipe,
        score,
        matchedIngredients,
        matchPercentage: Math.min(100, (score / recipe.ingredients.length) * 100)
      }
    })

    // Sort by score (highest first) and filter recipes with matches
    const recommendedRecipes = scoredRecipes
      .filter(recipe => recipe.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10) // Top 10 recommendations

    // Essential logging - only recipe count
    console.log("🍽️ Found", recommendedRecipes.length, "matching recipes")

    return NextResponse.json({
      recommendations: recommendedRecipes,
      totalFound: recommendedRecipes.length,
      detectedIngredients: ingredients
    })

  } catch (error) {
    console.error("❌ Recipe Recommendation Error:", error)
    
    return NextResponse.json({
      error: "Failed to generate recommendations",
      recommendations: [],
      totalFound: 0
    }, { status: 500 })
  }
} 