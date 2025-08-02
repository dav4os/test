import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface Offer {
  id: number;
  title: string;
  image: string;
  price: string;
  duration: string;
  alt: string;
  rating?: number;
  location?: string;
}

interface HomeOffersProps {
  offers: Offer[];
}

const HomeOffers: React.FC<HomeOffersProps> = memo(({ offers }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Популярные экскурсии
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Выберите из наших лучших туров и откройте для себя самые удивительные места Дубая
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <OptimizedImage
                  src={offer.image}
                  alt={offer.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
                  {offer.price}
                </div>
                
                {/* Rating */}
                {offer.rating && (
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span>{offer.rating}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                  {offer.title}
                </h3>
                
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{offer.duration}</span>
                  </div>
                  {offer.location && (
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{offer.location}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  Погрузитесь в удивительный мир Дубая с нашими профессиональными гидами
                </p>

                {/* CTA Button */}
                <Link
                  to={`/tours/${offer.id}`}
                  className="inline-block w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-3 px-6 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                >
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/tours"
            className="inline-block bg-white text-amber-600 border-2 border-amber-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-amber-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Посмотреть все экскурсии
          </Link>
        </div>
      </div>
    </section>
  );
});

HomeOffers.displayName = 'HomeOffers';

export default HomeOffers; 