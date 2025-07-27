import { typedSupabase } from '../utils/supabase';
import { LeadRow, LeadInsert, LeadUpdate } from '../utils/supabase';

export interface Lead {
  id?: number;
  name: string;
  phone?: string;
  email?: string;
  type?: string;
  message?: string;
  status?: string;
  created_at?: string;
}

// Преобразование типов
const convertToLead = (row: LeadRow): Lead => ({
  id: row.id,
  name: row.name,
  phone: row.phone || '',
  email: row.email || '',
  type: row.type || '',
  message: row.message || '',
  status: row.status || 'new',
  created_at: row.created_at
});

const convertToLeadInsert = (lead: Omit<Lead, 'id' | 'created_at'>): LeadInsert => ({
  name: lead.name,
  phone: lead.phone,
  email: lead.email,
  type: lead.type,
  message: lead.message,
  status: lead.status || 'new'
});

export const leadsService = {
  /**
   * Создать новую заявку
   */
  async createLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead> {
    try {
      const insertData = convertToLeadInsert(lead);
      
      const { data, error } = await typedSupabase
        .from('leads')
        .insert(insertData)
        .select()
        .single();
      
      if (error) {
        console.error('Error creating lead:', error);
        throw error;
      }
      
      return convertToLead(data);
    } catch (error) {
      console.error('LeadsService.createLead error:', error);
      throw error;
    }
  },

  /**
   * Получить все заявки
   */
  async getAllLeads(): Promise<Lead[]> {
    try {
      const { data, error } = await typedSupabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching leads:', error);
        throw error;
      }
      
      return (data || []).map(convertToLead);
    } catch (error) {
      console.error('LeadsService.getAllLeads error:', error);
      throw error;
    }
  },

  /**
   * Получить заявки по статусу
   */
  async getLeadsByStatus(status: string): Promise<Lead[]> {
    try {
      const { data, error } = await typedSupabase
        .from('leads')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching leads by status:', error);
        throw error;
      }
      
      return (data || []).map(convertToLead);
    } catch (error) {
      console.error('LeadsService.getLeadsByStatus error:', error);
      throw error;
    }
  },

  /**
   * Получить заявку по ID
   */
  async getLeadById(id: number): Promise<Lead | null> {
    try {
      const { data, error } = await typedSupabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null;
        }
        console.error('Error fetching lead by id:', error);
        throw error;
      }
      
      return convertToLead(data);
    } catch (error) {
      console.error('LeadsService.getLeadById error:', error);
      throw error;
    }
  },

  /**
   * Обновить статус заявки
   */
  async updateLeadStatus(id: number, status: string): Promise<Lead> {
    try {
      const { data, error } = await typedSupabase
        .from('leads')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating lead status:', error);
        throw error;
      }
      
      return convertToLead(data);
    } catch (error) {
      console.error('LeadsService.updateLeadStatus error:', error);
      throw error;
    }
  },

  /**
   * Обновить заявку
   */
  async updateLead(id: number, updates: Partial<Lead>): Promise<Lead> {
    try {
      const updateData: Partial<LeadUpdate> = {};
      
      if (updates.name) updateData.name = updates.name;
      if (updates.phone !== undefined) updateData.phone = updates.phone;
      if (updates.email !== undefined) updateData.email = updates.email;
      if (updates.type !== undefined) updateData.type = updates.type;
      if (updates.message !== undefined) updateData.message = updates.message;
      if (updates.status !== undefined) updateData.status = updates.status;
      
      const { data, error } = await typedSupabase
        .from('leads')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating lead:', error);
        throw error;
      }
      
      return convertToLead(data);
    } catch (error) {
      console.error('LeadsService.updateLead error:', error);
      throw error;
    }
  },

  /**
   * Удалить заявку
   */
  async deleteLead(id: number): Promise<void> {
    try {
      const { error } = await typedSupabase
        .from('leads')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting lead:', error);
        throw error;
      }
    } catch (error) {
      console.error('LeadsService.deleteLead error:', error);
      throw error;
    }
  },

  /**
   * Получить статистику заявок
   */
  async getLeadsStats(): Promise<{
    total: number;
    new: number;
    inProgress: number;
    completed: number;
  }> {
    try {
      const { data, error } = await typedSupabase
        .from('leads')
        .select('status');
      
      if (error) {
        console.error('Error fetching leads stats:', error);
        throw error;
      }
      
      const stats = {
        total: data?.length || 0,
        new: data?.filter(lead => lead.status === 'new').length || 0,
        inProgress: data?.filter(lead => lead.status === 'in_progress').length || 0,
        completed: data?.filter(lead => lead.status === 'completed').length || 0
      };
      
      return stats;
    } catch (error) {
      console.error('LeadsService.getLeadsStats error:', error);
      throw error;
    }
  },

  /**
   * Поиск заявок
   */
  async searchLeads(query: string): Promise<Lead[]> {
    try {
      const { data, error } = await typedSupabase
        .from('leads')
        .select('*')
        .or(`name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%,message.ilike.%${query}%`)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error searching leads:', error);
        throw error;
      }
      
      return (data || []).map(convertToLead);
    } catch (error) {
      console.error('LeadsService.searchLeads error:', error);
      throw error;
    }
  },

  /**
   * Получить заявки за период
   */
  async getLeadsByDateRange(startDate: string, endDate: string): Promise<Lead[]> {
    try {
      const { data, error } = await typedSupabase
        .from('leads')
        .select('*')
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching leads by date range:', error);
        throw error;
      }
      
      return (data || []).map(convertToLead);
    } catch (error) {
      console.error('LeadsService.getLeadsByDateRange error:', error);
      throw error;
    }
  },

  /**
   * Экспорт заявок в CSV
   */
  async exportLeadsToCSV(): Promise<string> {
    try {
      const leads = await this.getAllLeads();
      
      const headers = ['ID', 'Имя', 'Телефон', 'Email', 'Тип', 'Сообщение', 'Статус', 'Дата создания'];
      const csvRows = [headers.join(',')];
      
      leads.forEach(lead => {
        const row = [
          lead.id,
          `"${lead.name}"`,
          `"${lead.phone || ''}"`,
          `"${lead.email || ''}"`,
          `"${lead.type || ''}"`,
          `"${lead.message || ''}"`,
          `"${lead.status || ''}"`,
          `"${lead.created_at || ''}"`
        ];
        csvRows.push(row.join(','));
      });
      
      return csvRows.join('\n');
    } catch (error) {
      console.error('LeadsService.exportLeadsToCSV error:', error);
      throw error;
    }
  }
}; 