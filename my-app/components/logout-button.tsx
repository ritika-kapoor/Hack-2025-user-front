// "use client"

// import { Button } from "@/components/ui/button"
// import { LogOut } from "lucide-react"
// import { useRouter } from "next/navigation"

// export default function LogoutButton() {
//   const router = useRouter()

//   const handleLogout = () => {
//     // Clear any stored data
//     localStorage.clear()
//     sessionStorage.clear()
    
//     // Redirect to login page
//     router.push('/auth/login')
//   }

//   return (
//     <Button
//       onClick={handleLogout}
//       variant="outline"
//       size="sm"
//       className="flex items-center gap-2"
//     >
//       <LogOut className="w-4 h-4" />
//       ログアウト
//     </Button>
//   )
// } 