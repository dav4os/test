import { supabase, typedSupabase } from '../utils/supabase';
import { BlogArticleRow, BlogArticleInsert, BlogArticleUpdate } from '../utils/supabase';
import { BlogArticle } from '../data/blogArticles';

// Преобразование типов между старым форматом и новым
const convertToBlogArticle = (row: BlogArticleRow): BlogArticle => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt || '',
  content: row.content,
  image: row.image || '',
  author: row.author || '',
  date: row.date || new Date().toISOString().split('T')[0],
  readTime: row.read_time || '',
  category: row.category || '',
  tags: row.tags || [],
  views: row.views || 0,
  likes: row.likes || 0,
  seo: {
    metaTitle: row.meta_title || '',
    metaDescription: row.meta_description || '',
    keywords: row.keywords || ''
  }
});

const convertToBlogArticleInsert = (article: Omit<BlogArticle, 'id'>): BlogArticleInsert => ({
  title: article.title,
  slug: article.slug,
  excerpt: article.excerpt,
  content: article.content,
  image: article.image,
  author: article.author,
  date: article.date,
  read_time: article.readTime,
  category: article.category,
  tags: article.tags,
  views: article.views,
  likes: article.likes,
  meta_title: article.seo.metaTitle,
  meta_description: article.seo.metaDescription,
  keywords: article.seo.keywords
});

export const blogService = {
  /**
   * Получить все статьи
   */
  async getAllArticles(): Promise<BlogArticle[]> {
    try {
      const { data, error } = await typedSupabase
        .from('blog_articles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching articles:', error);
        throw error;
      }
      
      return (data || []).map(convertToBlogArticle);
    } catch (error) {
      console.error('BlogService.getAllArticles error:', error);
      throw error;
    }
  },

  /**
   * Получить статью по slug
   */
  async getArticleBySlug(slug: string): Promise<BlogArticle | null> {
    try {
      const { data, error } = await typedSupabase
        .from('blog_articles')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // Статья не найдена
          return null;
        }
        console.error('Error fetching article by slug:', error);
        throw error;
      }
      
      return convertToBlogArticle(data);
    } catch (error) {
      console.error('BlogService.getArticleBySlug error:', error);
      throw error;
    }
  },

  /**
   * Получить статьи по категории
   */
  async getArticlesByCategory(category: string): Promise<BlogArticle[]> {
    try {
      const { data, error } = await typedSupabase
        .from('blog_articles')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching articles by category:', error);
        throw error;
      }
      
      return (data || []).map(convertToBlogArticle);
    } catch (error) {
      console.error('BlogService.getArticlesByCategory error:', error);
      throw error;
    }
  },

  /**
   * Получить похожие статьи
   */
  async getRelatedArticles(currentSlug: string, category: string, limit: number = 3): Promise<BlogArticle[]> {
    try {
      const { data, error } = await typedSupabase
        .from('blog_articles')
        .select('*')
        .eq('category', category)
        .neq('slug', currentSlug)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error('Error fetching related articles:', error);
        throw error;
      }
      
      return (data || []).map(convertToBlogArticle);
    } catch (error) {
      console.error('BlogService.getRelatedArticles error:', error);
      throw error;
    }
  },

  /**
   * Создать новую статью
   */
  async createArticle(article: Omit<BlogArticle, 'id'>): Promise<BlogArticle> {
    try {
      const insertData = convertToBlogArticleInsert(article);
      
      const { data, error } = await typedSupabase
        .from('blog_articles')
        .insert(insertData)
        .select()
        .single();
      
      if (error) {
        console.error('Error creating article:', error);
        throw error;
      }
      
      return convertToBlogArticle(data);
    } catch (error) {
      console.error('BlogService.createArticle error:', error);
      throw error;
    }
  },

  /**
   * Обновить статью
   */
  async updateArticle(id: number, updates: Partial<BlogArticle>): Promise<BlogArticle> {
    try {
      const updateData: Partial<BlogArticleUpdate> = {};
      
      if (updates.title) updateData.title = updates.title;
      if (updates.slug) updateData.slug = updates.slug;
      if (updates.excerpt) updateData.excerpt = updates.excerpt;
      if (updates.content) updateData.content = updates.content;
      if (updates.image) updateData.image = updates.image;
      if (updates.author) updateData.author = updates.author;
      if (updates.date) updateData.date = updates.date;
      if (updates.readTime) updateData.read_time = updates.readTime;
      if (updates.category) updateData.category = updates.category;
      if (updates.tags) updateData.tags = updates.tags;
      if (updates.views !== undefined) updateData.views = updates.views;
      if (updates.likes !== undefined) updateData.likes = updates.likes;
      if (updates.seo) {
        updateData.meta_title = updates.seo.metaTitle;
        updateData.meta_description = updates.seo.metaDescription;
        updateData.keywords = updates.seo.keywords;
      }
      
      const { data, error } = await typedSupabase
        .from('blog_articles')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating article:', error);
        throw error;
      }
      
      return convertToBlogArticle(data);
    } catch (error) {
      console.error('BlogService.updateArticle error:', error);
      throw error;
    }
  },

  /**
   * Удалить статью
   */
  async deleteArticle(id: number): Promise<void> {
    try {
      const { error } = await typedSupabase
        .from('blog_articles')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting article:', error);
        throw error;
      }
    } catch (error) {
      console.error('BlogService.deleteArticle error:', error);
      throw error;
    }
  },

  /**
   * Увеличить счетчик просмотров
   */
  async incrementViews(id: number): Promise<void> {
    try {
      const { error } = await typedSupabase
        .from('blog_articles')
        .update({ views: typedSupabase.rpc('increment_views', { article_id: id }) })
        .eq('id', id);
      
      if (error) {
        console.error('Error incrementing views:', error);
        // Если RPC функция не существует, используем простой запрос
        const { data } = await typedSupabase
          .from('blog_articles')
          .select('views')
          .eq('id', id)
          .single();
        
        if (data) {
          await typedSupabase
            .from('blog_articles')
            .update({ views: (data.views || 0) + 1 })
            .eq('id', id);
        }
      }
    } catch (error) {
      console.error('BlogService.incrementViews error:', error);
    }
  },

  /**
   * Увеличить счетчик лайков
   */
  async incrementLikes(id: number): Promise<void> {
    try {
      const { data } = await typedSupabase
        .from('blog_articles')
        .select('likes')
        .eq('id', id)
        .single();
      
      if (data) {
        await typedSupabase
          .from('blog_articles')
          .update({ likes: (data.likes || 0) + 1 })
          .eq('id', id);
      }
    } catch (error) {
      console.error('BlogService.incrementLikes error:', error);
    }
  },

  /**
   * Поиск статей
   */
  async searchArticles(query: string): Promise<BlogArticle[]> {
    try {
      const { data, error } = await typedSupabase
        .from('blog_articles')
        .select('*')
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error searching articles:', error);
        throw error;
      }
      
      return (data || []).map(convertToBlogArticle);
    } catch (error) {
      console.error('BlogService.searchArticles error:', error);
      throw error;
    }
  }
}; 