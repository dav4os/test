import React from 'react';
import { Tour } from '../types/tour';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Star, 
  Shield, 
  Car, 
  Camera, 
  CheckCircle 
} from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface TourCardProps {
  tour: Tour;
  onBook: () => void;
  categoryLabel?: string;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onBook, categoryLabel }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group">
      {/* Tour Image */}
      <div className="relative overflow-hidden h-80">
        <OptimizedImage
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-amber-600">
          {tour.duration}
        </div>
        <div className="absolute bottom-6 left-6">
          <h3 className="text-3xl font-bold text-white mb-2">{tour.title}</h3>
          <div className="flex items-center gap-2 text-amber-300">
            <Star size={20} fill="currentColor" />
            <span className="text-white font-semibold">{tour.rating}</span>
            <span className="text-white/80">({tour.reviews} отзывов)</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-6">
          {tour.description}
        </p>

        {/* Tour Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-amber-500" />
              <span className="text-gray-600">Длительность: <strong>{tour.duration}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users size={16} className="text-amber-500" />
              <span className="text-gray-600">Группа: <strong>{tour.groupSize}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-amber-500" />
              <span className="text-gray-600">Категория: <strong>{categoryLabel}</strong></span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Shield size={16} className="text-amber-500" />
              <span className="text-gray-600">Страховка: <strong>Включена</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Car size={16} className="text-amber-500" />
              <span className="text-gray-600">Трансфер: <strong>Включен</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Camera size={16} className="text-amber-500" />
              <span className="text-gray-600">Фото: <strong>Включено</strong></span>
            </div>
          </div>
        </div>

        {/* Highlights */}
        {tour.highlights && tour.highlights.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-800 mb-3">Основные достопримечательности:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tour.highlights.slice(0, 6).map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-amber-600">
            {tour.price}
          </div>
          <button
            onClick={onBook}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard; 