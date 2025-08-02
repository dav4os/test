import React, { useState, useEffect } from 'react';
import { TourFilters as TourFiltersType } from '../types/tour';
import { tourService } from '../services/tourService';
import { 
  Globe, 
  MapPin, 
  Route, 
  Star, 
  Award,
  Search,
  Filter,
  X
} from 'lucide-react';

interface TourFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onFiltersChange: (filters: TourFiltersType) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const TourFilters: React.FC<TourFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  onFiltersChange,
  searchTerm,
  onSearchChange
}) => {
  const [categories, setCategories] = useState<{ id: string; label: string; icon: string }[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<TourFiltersType>({});

  // Загружаем категории из базы данных
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await tourService.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error loading categories:', error);
        // Fallback к статичным категориям
        setCategories([
          { id: 'all', label: 'Все экскурсии', icon: 'Globe' },
          { id: 'city', label: 'Городские', icon: 'MapPin' },
          { id: 'desert', label: 'Пустыня', icon: 'Route' },
          { id: 'premium', label: 'Премиум', icon: 'Star' },
          { id: 'cultural', label: 'Культурные', icon: 'Award' }
        ]);
      }
    };

    loadCategories();
  }, []);

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Globe,
      MapPin,
      Route,
      Star,
      Award
    };
    return iconMap[iconName] || Globe;
  };

  const handleFilterChange = (key: keyof TourFiltersType, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFiltersChange({});
    onSearchChange('');
  };

  return (
    <div className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск экскурсий..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {categories.map((category) => {
            const IconComponent = getIconComponent(category.icon);
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-600 shadow-sm hover:shadow-md'
                }`}
              >
                <IconComponent size={18} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Advanced Filters */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-amber-600 transition-colors duration-300"
          >
            <Filter size={18} />
            {showFilters ? 'Скрыть фильтры' : 'Дополнительные фильтры'}
          </button>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="mt-6 p-6 bg-gray-50 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Цена (AED)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="От"
                    value={filters.priceMin || ''}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="number"
                    placeholder="До"
                    value={filters.priceMax || ''}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value ? Number(e.target.value) : undefined)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Длительность
                </label>
                <select
                  value={filters.duration || ''}
                  onChange={(e) => handleFilterChange('duration', e.target.value || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Любая</option>
                  <option value="1 день">1 день</option>
                  <option value="2 дня">2 дня</option>
                  <option value="3 дня">3 дня</option>
                  <option value="1 неделя">1 неделя</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Минимальный рейтинг
                </label>
                <select
                  value={filters.rating || ''}
                  onChange={(e) => handleFilterChange('rating', e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Любой</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.0">4.0+</option>
                  <option value="3.5">3.5+</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors duration-300"
              >
                <X size={16} />
                Очистить фильтры
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourFilters; 