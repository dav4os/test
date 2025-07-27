import { createClient } from '@supabase/supabase-js'

// Получаем переменные окружения
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Проверяем наличие обязательных переменных
if (!supabaseUrl) {
  console.error('❌ VITE_SUPABASE_URL is not defined in environment variables')
}

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY is not defined in environment variables')
}

// Проверяем, что обе переменные определены
const isConfigured = !!(supabaseUrl && supabaseAnonKey)

// Создаем клиент Supabase только если переменные настроены
export const supabase = isConfigured 
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : null

// Типы для базы данных
export interface Database {
  public: {
    Tables: {
      blog_articles: {
        Row: {
          id: number
          title: string
          slug: string
          excerpt: string | null
          content: string
          image: string | null
          author: string | null
          date: string | null
          read_time: string | null
          category: string | null
          tags: string[] | null
          views: number | null
          likes: number | null
          meta_title: string | null
          meta_description: string | null
          keywords: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          slug: string
          excerpt?: string | null
          content: string
          image?: string | null
          author?: string | null
          date?: string | null
          read_time?: string | null
          category?: string | null
          tags?: string[] | null
          views?: number | null
          likes?: number | null
          meta_title?: string | null
          meta_description?: string | null
          keywords?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          image?: string | null
          author?: string | null
          date?: string | null
          read_time?: string | null
          category?: string | null
          tags?: string[] | null
          views?: number | null
          likes?: number | null
          meta_title?: string | null
          meta_description?: string | null
          keywords?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: number
          name: string
          phone: string | null
          email: string | null
          type: string | null
          message: string | null
          status: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          phone?: string | null
          email?: string | null
          type?: string | null
          message?: string | null
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          phone?: string | null
          email?: string | null
          type?: string | null
          message?: string | null
          status?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Типизированный клиент
export const typedSupabase = isConfigured 
  ? createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : null

// Функция для тестирования подключения
export const testSupabaseConnection = async (): Promise<boolean> => {
  try {
    if (!supabase) {
      console.error('❌ Supabase client is not configured')
      return false
    }

    const { data, error } = await supabase
      .from('blog_articles')
      .select('id')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection error:', error)
      return false
    }
    
    console.log('✅ Supabase connection successful!')
    return true
  } catch (error) {
    console.error('❌ Supabase connection failed:', error)
    return false
  }
}

// Функция для получения информации о подключении
export const getSupabaseInfo = () => {
  return {
    url: supabaseUrl,
    hasKey: !!supabaseAnonKey,
    keyLength: supabaseAnonKey?.length || 0,
    isConfigured
  }
}

// Экспортируем типы для использования в других файлах
export type BlogArticleRow = Database['public']['Tables']['blog_articles']['Row']
export type BlogArticleInsert = Database['public']['Tables']['blog_articles']['Insert']
export type BlogArticleUpdate = Database['public']['Tables']['blog_articles']['Update']

export type LeadRow = Database['public']['Tables']['leads']['Row']
export type LeadInsert = Database['public']['Tables']['leads']['Insert']
export type LeadUpdate = Database['public']['Tables']['leads']['Update'] 