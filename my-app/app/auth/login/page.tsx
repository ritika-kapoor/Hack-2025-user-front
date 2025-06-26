import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your credentials to access your account.
          </p>
        </div>
        <div className="mt-6 space-y-4">
          <Input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Email"
            type="email"
          />
          <Input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Password"
            type="password"
          />
          <Button className="w-full" type="submit">
            Login
          </Button>
          <div className="text-center text-sm">
            <Link
              className="font-medium text-primary-500 hover:underline dark:text-primary-400"
              href="#"
            >
              Forgot password?
            </Link>
          </div>
          <div className="text-center text-sm">
            Don't have an account?
            <Link
              className="font-medium text-primary-500 hover:underline dark:text-primary-400"
              href="/auth/register"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}