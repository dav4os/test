import { useState, useEffect, useCallback } from 'react';
import { Tour, TourFilters, ToursResponse } from '../types/tour';
import { tourService } from '../services/tourService';

interface UseToursReturn {
  tours: Tour[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  hasMore: boolean;
  loadTours: (filters?: TourFilters, page?: number) => Promise<void>;
  loadMore: () => Promise<void>;
  searchTours: (searchTerm: string) => Promise<Tour[]>;
  refreshTours: () => Promise<void>;
}

export const useTours = (initialFilters: TourFilters = {}): UseToursReturn => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<TourFilters>(initialFilters);
  const [hasMore, setHasMore] = useState(true);

  const loadTours = useCallback(async (newFilters?: TourFilters, newPage: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const currentFilters = newFilters || filters;
      const response: ToursResponse = await tourService.getTours(currentFilters, newPage, 10);

      if (newPage === 1) {
        setTours(response.tours);
      } else {
        setTours(prev => [...prev, ...response.tours]);
      }

      setTotal(response.total);
      setPage(newPage);
      setHasMore(response.tours.length === 10 && response.total > newPage * 10);
      
      if (newFilters) {
        setFilters(newFilters);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки туров');
      console.error('Error loading tours:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    await loadTours(undefined, page + 1);
  }, [hasMore, loading, page, loadTours]);

  const searchTours = useCallback(async (searchTerm: string): Promise<Tour[]> => {
    try {
      return await tourService.searchTours(searchTerm);
    } catch (err) {
      console.error('Error searching tours:', err);
      return [];
    }
  }, []);

  const refreshTours = useCallback(async () => {
    await loadTours(filters, 1);
  }, [filters, loadTours]);

  // Загружаем туры при монтировании компонента
  useEffect(() => {
    // Проверяем, настроен ли Supabase
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('⚠️ Supabase не настроен. Используется fallback режим.');
      setError('Supabase не настроен. Создайте файл .env с переменными VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY');
      return;
    }
    
    loadTours();
  }, []);

  return {
    tours,
    loading,
    error,
    total,
    page,
    hasMore,
    loadTours,
    loadMore,
    searchTours,
    refreshTours
  };
}; 