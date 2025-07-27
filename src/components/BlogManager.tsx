import React, { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';
import { BlogArticle } from '../data/blogArticles';
import { Plus, Edit, Trash2, Eye, Save, X, Calendar, User, Tag } from 'lucide-react';

export default function BlogManager() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    image_url: '',
    category: 'Общее',
    tags: ''
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllArticles();
      setArticles(data);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Creating article with data:', formData);
      
      // Создаем slug из заголовка
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      const articleData = {
        title: formData.title,
        slug: slug,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        date: formData.date,
        image: formData.image_url,
        readTime: '5 мин',
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        views: 0,
        likes: 0,
        seo: {
          metaTitle: formData.title,
          metaDescription: formData.excerpt,
          keywords: formData.tags
        }
      };

      console.log('Article data to send:', articleData);
      
      const result = await blogService.createArticle(articleData);
      console.log('Article created successfully:', result);
      
      setIsCreating(false);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        image_url: '',
        category: 'Общее',
        tags: ''
      });
      await loadArticles();
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Ошибка при создании статьи: ' + (error as Error).message);
    }
  };

  const handleUpdateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    
    try {
      await blogService.updateArticle(editingArticle.id, {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        date: formData.date,
        image: formData.image_url
      });
      
      setEditingArticle(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        image_url: '',
        category: 'Общее',
        tags: ''
      });
      await loadArticles();
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту статью?')) {
      try {
        await blogService.deleteArticle(id);
        await loadArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  const startEditing = (article: BlogArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      author: article.author,
      date: article.date,
      image_url: article.image,
      category: article.category,
      tags: article.tags.join(', ')
    });
  };

  const cancelEditing = () => {
    setEditingArticle(null);
    setIsCreating(false);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      image_url: '',
      category: 'Общее',
      tags: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <p className="text-center text-gray-600">Загрузка статей...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Заголовок */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Управление блогом</h1>
                <p className="text-gray-600 mt-1">Создание и редактирование статей</p>
              </div>
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Новая статья
              </button>
            </div>
          </div>

          {/* Форма создания/редактирования */}
          {(isCreating || editingArticle) && (
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold mb-4">
                {isCreating ? 'Создание новой статьи' : 'Редактирование статьи'}
              </h2>
              <form onSubmit={isCreating ? handleCreateArticle : handleUpdateArticle} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Автор</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Краткое описание</label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Содержание</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL изображения</label>
                    <input
                      type="text"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Общее">Общее</option>
                      <option value="Экскурсии">Экскурсии</option>
                      <option value="Аренда авто">Аренда авто</option>
                      <option value="Достопримечательности">Достопримечательности</option>
                      <option value="Советы">Советы</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isCreating ? 'Создать' : 'Сохранить'}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Список статей */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Все статьи ({articles.length})</h2>
            
            {articles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Статьи не найдены</p>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map(article => (
                  <div key={article.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{article.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{article.excerpt}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {article.author}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {article.date}
                          </span>
                          <span className="flex items-center">
                            <Tag className="w-4 h-4 mr-1" />
                            {article.category}
                          </span>
                          <span>Просмотры: {article.views}</span>
                          <span>Лайки: {article.likes}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditing(article)}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 