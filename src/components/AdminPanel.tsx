import React, { useState, useEffect } from 'react';
import { blogService } from '../services/blogService';
import { leadsService, Lead } from '../services/leadsService';
import { BlogArticle } from '../data/blogArticles';
import { Plus, Edit, Trash2, Eye, Download, RefreshCw, Search, Filter } from 'lucide-react';

export default function AdminPanel() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'articles' | 'leads'>('articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [articlesData, leadsData] = await Promise.all([
        blogService.getAllArticles(),
        leadsService.getAllLeads()
      ]);
      setArticles(articlesData);
      setLeads(leadsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLeadStatus = async (id: number, newStatus: string) => {
    try {
      await leadsService.updateLeadStatus(id, newStatus);
      await loadData(); // Перезагружаем данные
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const handleDeleteLead = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту заявку?')) {
      try {
        await leadsService.deleteLead(id);
        await loadData();
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  const handleExportLeads = async () => {
    try {
      const csv = await leadsService.exportLeadsToCSV();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting leads:', error);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.type?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStats = () => {
    const totalLeads = leads.length;
    const newLeads = leads.filter(lead => lead.status === 'new').length;
    const inProgressLeads = leads.filter(lead => lead.status === 'in_progress').length;
    const completedLeads = leads.filter(lead => lead.status === 'completed').length;

    return { totalLeads, newLeads, inProgressLeads, completedLeads };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <p className="text-center text-gray-600">Загрузка данных...</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Админ-панель</h1>
            <p className="text-gray-600 mt-1">Управление контентом и заявками</p>
          </div>

          {/* Статистика */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600">Всего заявок</h3>
                <p className="text-2xl font-bold text-blue-900">{stats.totalLeads}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-600">Новые</h3>
                <p className="text-2xl font-bold text-yellow-900">{stats.newLeads}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-orange-600">В работе</h3>
                <p className="text-2xl font-bold text-orange-900">{stats.inProgressLeads}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600">Завершены</h3>
                <p className="text-2xl font-bold text-green-900">{stats.completedLeads}</p>
              </div>
            </div>
          </div>

          {/* Табы */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('articles')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'articles'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Статьи ({articles.length})
              </button>
              <button
                onClick={() => setActiveTab('leads')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'leads'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Заявки ({leads.length})
              </button>
            </nav>
          </div>

          {/* Контент */}
          <div className="p-6">
            {activeTab === 'articles' ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Статьи блога</h2>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить статью
                  </button>
                </div>

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
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <span>Автор: {article.author}</span>
                              <span className="mx-2">•</span>
                              <span>Дата: {article.date}</span>
                              <span className="mx-2">•</span>
                              <span>Просмотры: {article.views}</span>
                              <span className="mx-2">•</span>
                              <span>Лайки: {article.likes}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Заявки</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleExportLeads}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Экспорт CSV
                    </button>
                    <button
                      onClick={loadData}
                      className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Обновить
                    </button>
                  </div>
                </div>

                {/* Фильтры */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Поиск по имени, email, телефону..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">Все статусы</option>
                      <option value="new">Новые</option>
                      <option value="in_progress">В работе</option>
                      <option value="completed">Завершены</option>
                    </select>
                  </div>
                </div>

                {filteredLeads.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Заявки не найдены</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Имя
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Контакты
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Тип
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Статус
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Дата
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Действия
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredLeads.map(lead => (
                          <tr key={lead.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{lead.email}</div>
                              <div className="text-sm text-gray-500">{lead.phone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{lead.type}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={lead.status || 'new'}
                                onChange={(e) => handleUpdateLeadStatus(lead.id!, e.target.value)}
                                className={`px-2 py-1 text-xs rounded-full ${
                                  lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                  lead.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}
                              >
                                <option value="new">Новая</option>
                                <option value="in_progress">В работе</option>
                                <option value="completed">Завершена</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleDeleteLead(lead.id!)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 