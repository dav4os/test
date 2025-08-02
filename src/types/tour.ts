export interface Tour {
  id: number;
  title: string;
  category: string;
  image: string;
  price: string;
  duration: string;
  groupSize: string;
  rating: number;
  reviews: number;
  description: string;
  highlights: string[];
  included: string[];
  schedule: TourSchedule[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TourSchedule {
  day: string;
  activities: string[];
}

export interface TourCategory {
  id: string;
  label: string;
  icon: string;
}

export interface ToursResponse {
  tours: Tour[];
  total: number;
  page: number;
  limit: number;
}

export interface TourFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  duration?: string;
  rating?: number;
  search?: string;
} 