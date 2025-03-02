"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

// Initial reviews data
const initialReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2 days ago",
    rating: 5,
    product: "Wireless Noise-Cancelling Headphones",
    comment:
      "Amazing sound quality and the noise cancellation is perfect for my commute. Battery life exceeds expectations!",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "1 week ago",
    rating: 4,
    product: "Smart Fitness Watch",
    comment:
      "Great fitness tracker with accurate measurements. The only reason I'm not giving 5 stars is because the app can be a bit slow sometimes.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    date: "2 weeks ago",
    rating: 3,
    product: "Portable Bluetooth Speaker",
    comment:
      "Decent sound for the size, but battery life is shorter than advertised. It's okay for casual use but nothing exceptional.",
  },
]

const products = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    price: "$249.99",
    image: "/placeholder.svg?height=200&width=200",
  },
  { id: 2, name: "Smart Fitness Watch", price: "$179.99", image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Portable Bluetooth Speaker", price: "$89.99", image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Ultra HD 4K Monitor", price: "$349.99", image: "/placeholder.svg?height=200&width=200" },
  { id: 5, name: "Ergonomic Mechanical Keyboard", price: "$129.99", image: "/placeholder.svg?height=200&width=200" },
  { id: 6, name: "Wireless Charging Pad", price: "$39.99", image: "/placeholder.svg?height=200&width=200" },
]

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews)
  const [newReview, setNewReview] = useState({
    name: "",
    comment: "",
    rating: 0,
    product: "",
  })
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReview.name && newReview.comment && newReview.rating > 0 && newReview.product) {
      const review = {
        id: reviews.length + 1,
        name: newReview.name,
        avatar: "/placeholder.svg?height=40&width=40",
        date: "Just now",
        rating: newReview.rating,
        product: newReview.product,
        comment: newReview.comment,
      }
      setReviews([review, ...reviews])
      setNewReview({ name: "", comment: "", rating: 0, product: "" })
    }
  }

  return (
    <div className="max-w-3xl mx-auto grid gap-8">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Write a Review</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="product">Product</Label>
              <select
                id="product"
                value={newReview.product}
                onChange={(e) => setNewReview({ ...newReview, product: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rating">Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= (hoveredRating || newReview.rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comment">Your Review</Label>
              <Textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your experience with this shop"
                required
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Review
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 mb-8">
        <h2 className="text-2xl font-bold">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-muted-foreground">{product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        <h2 className="text-2xl font-bold">Customer Reviews ({reviews.length})</h2>
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src={review.avatar} alt={review.name} />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{review.name}</h3>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm font-medium mt-1">Product: {review.product}</p>
                  <p className="text-sm mt-2">{review.comment}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Helpful
                </Button>
                <Button variant="ghost" size="sm">
                  Report
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

