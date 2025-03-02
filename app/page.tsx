import Reviews from "@/components/reviews"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product Reviews",
  description: "Review your favorite products",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-10 px-4 md:px-6">
        <h1 className="text-3xl font-bold text-center mb-10">Product Reviews</h1>
        <Reviews />
      </div>
    </main>
  )
}

