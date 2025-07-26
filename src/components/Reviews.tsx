import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  service?: string;
  verified?: boolean;
}

interface ReviewsProps {
  reviews: Review[];
  title?: string;
  showAverage?: boolean;
}

const Reviews: React.FC<ReviewsProps> = ({ 
  reviews, 
  title = "Отзывы наших клиентов",
  showAverage = true 
}) => {
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  // Generate Reviews structured data
  const reviewsStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Explore IT Dubai",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": totalReviews,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewBody": review.content,
      "datePublished": review.date,
      "itemReviewed": {
        "@type": "Service",
        "name": review.service || "Туристические услуги"
      }
    }))
  };

  return (
    <>
      {/* Reviews Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewsStructuredData, null, 2)
        }}
      />

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {title}
        </h2>

        {showAverage && (
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={`${
                      i < Math.floor(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-gray-600">
              {totalReviews} отзывов на основе реального опыта
            </p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                {review.verified && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Проверенный
                  </span>
                )}
              </div>

              <div className="mb-4">
                <Quote size={20} className="text-amber-400 mb-2" />
                <p className="text-gray-700 leading-relaxed italic">
                  "{review.content}"
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">
                    {review.author}
                  </p>
                  {review.service && (
                    <p className="text-sm text-gray-600">
                      {review.service}
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews; 