import { Star, Quote } from "lucide-react";
import "./ReviewsPage.css";

const REVIEWS = [
  {
    id: 1,
    name: "Sopheap Chan",
    role: "Drift Enthusiast",
    rating: 5,
    comment: "The drift cars on this platform are incredible! Fast shipping, great handling, and unbeatable battery life on the track.",
    date: "August 2026"
  },
  {
    id: 2,
    name: "Dalin S.",
    role: "Off-Road Buggy Racer",
    rating: 5,
    comment: "Rigorous testing shows these buggies handle rough jumps and dirt tracks without breaking a sweat. Amazing quality!",
    date: "August 2026"
  },
  {
    id: 3,
    name: "Vichea Rith",
    role: "Hobbyist",
    rating: 4,
    comment: "Great selection of models and very easy to navigate. Customer support helped me pick the right monster truck for my son.",
    date: "July 2026"
  }
];

export default function ReviewsPage() {
  return (
    <div className="reviews-page">
      <div className="reviews-container">
        {/* Header Section */}
        <div className="reviews-header">
          <h1>Customer Reviews</h1>
          <p className="reviews-lead">
            See what our community of racers, drifters, and hobbyists has to say about our high-performance RC cars.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-quote-icon">
                <Quote size={24} />
              </div>
              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < rev.rating ? "#e9a7b1" : "transparent"}
                    color={i < rev.rating ? "#e9a7b1" : "#52374e"}
                  />
                ))}
              </div>
              <p className="review-comment">&ldquo;{rev.comment}&rdquo;</p>
              <div className="review-author">
                <div className="author-info">
                  <h3>{rev.name}</h3>
                  <span className="author-role">{rev.role}</span>
                </div>
                <span className="review-date">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}