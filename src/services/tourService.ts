import { supabase } from '../utils/supabase';
import { Tour, ToursResponse, TourFilters } from '../types/tour';

export class TourService {
  private static instance: TourService;
  
  private constructor() {}
  
  public static getInstance(): TourService {
    if (!TourService.instance) {
      TourService.instance = new TourService();
    }
    return TourService.instance;
  }

  async getTours(filters: TourFilters = {}, page: number = 1, limit: number = 10): Promise<ToursResponse> {
    try {
      if (!supabase) {
        throw new Error('Supabase client is not configured');
      }

      let query = supabase
        .from('tours')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      // Применяем фильтры
      if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters.rating) {
        query = query.gte('rating', filters.rating);
      }

      // Пагинация
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching tours:', error);
        throw new Error('Failed to fetch tours');
      }

      // Преобразуем данные в нужный формат
      const tours: Tour[] = (data || []).map(tour => ({
        id: tour.id,
        title: tour.title,
        category: tour.category,
        image: tour.image_url || tour.image,
        price: tour.price,
        duration: tour.duration,
        groupSize: tour.group_size,
        rating: tour.rating || 0,
        reviews: tour.reviews_count || 0,
        description: tour.description,
        highlights: tour.highlights || [],
        included: tour.included || [],
        schedule: tour.schedule || [],
        isActive: tour.is_active,
        createdAt: tour.created_at,
        updatedAt: tour.updated_at
      }));

      return {
        tours,
        total: count || 0,
        page,
        limit
      };
    } catch (error) {
      console.error('TourService.getTours error:', error);
      throw error;
    }
  }

  async getTourById(id: number): Promise<Tour | null> {
    try {
      if (!supabase) {
        throw new Error('Supabase client is not configured');
      }

      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching tour:', error);
        return null;
      }

      if (!data) return null;

      return {
        id: data.id,
        title: data.title,
        category: data.category,
        image: data.image_url || data.image,
        price: data.price,
        duration: data.duration,
        groupSize: data.group_size,
        rating: data.rating || 0,
        reviews: data.reviews_count || 0,
        description: data.description,
        highlights: data.highlights || [],
        included: data.included || [],
        schedule: data.schedule || [],
        isActive: data.is_active,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('TourService.getTourById error:', error);
      return null;
    }
  }

  async getCategories(): Promise<{ id: string; label: string; icon: string }[]> {
    try {
      if (!supabase) {
        throw new Error('Supabase client is not configured');
      }

      const { data, error } = await supabase
        .from('tour_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        return [];
      }

      // Просто возвращаем категории из базы данных
      return (data || []).map(category => ({
        id: category.id,
        label: category.name,
        icon: category.icon || 'Globe'
      }));
    } catch (error) {
      console.error('TourService.getCategories error:', error);
      return [];
    }
  }

  async searchTours(searchTerm: string): Promise<Tour[]> {
    try {
      if (!supabase) {
        throw new Error('Supabase client is not configured');
      }

      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('is_active', true)
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error searching tours:', error);
        return [];
      }

      return (data || []).map(tour => ({
        id: tour.id,
        title: tour.title,
        category: tour.category,
        image: tour.image_url || tour.image,
        price: tour.price,
        duration: tour.duration,
        groupSize: tour.group_size,
        rating: tour.rating || 0,
        reviews: tour.reviews_count || 0,
        description: tour.description,
        highlights: tour.highlights || [],
        included: tour.included || [],
        schedule: tour.schedule || [],
        isActive: tour.is_active,
        createdAt: tour.created_at,
        updatedAt: tour.updated_at
      }));
    } catch (error) {
      console.error('TourService.searchTours error:', error);
      return [];
    }
  }
}

export const tourService = TourService.getInstance(); 