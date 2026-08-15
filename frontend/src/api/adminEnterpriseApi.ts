import axiosClient from './axiosClient';

export interface EnterpriseOrg {
  id: number;
  name: string;
  code: string;
  logoUrl?: string;
  maxSeats: number;
  activeSeats: number;
  contactEmail?: string;
  contactPhone?: string;
  validUntil?: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateOrgPayload {
  name: string;
  code: string;
  logoUrl?: string;
  maxSeats: number;
  contactEmail?: string;
  contactPhone?: string;
  durationDays?: number;
}

export interface StudentImportItem {
  email: string;
  fullName?: string;
  targetLevel?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

export interface BulkImportResponse {
  successCount: number;
  totalRequested: number;
  importedEmails: string[];
  failedEmails: string[];
}

export interface EnterpriseAnalytics {
  totalOrgsCount: number;
  totalSeatsAllocated: number;
  totalActiveStudents: number;
  avgCompletionRate: number;
}

export const adminEnterpriseApi = {
  getOrgs: async (): Promise<EnterpriseOrg[]> => {
    const res = await axiosClient.get('/admin/enterprise/orgs');
    return res.data.data;
  },

  createOrg: async (payload: CreateOrgPayload): Promise<EnterpriseOrg> => {
    const res = await axiosClient.post('/admin/enterprise/orgs', payload);
    return res.data.data;
  },

  updateOrg: async (id: number, payload: CreateOrgPayload): Promise<EnterpriseOrg> => {
    const res = await axiosClient.put(`/admin/enterprise/orgs/${id}`, payload);
    return res.data.data;
  },

  deleteOrg: async (id: number): Promise<void> => {
    await axiosClient.delete(`/admin/enterprise/orgs/${id}`);
  },

  bulkImportStudents: async (id: number, students: StudentImportItem[]): Promise<BulkImportResponse> => {
    const res = await axiosClient.post(`/admin/enterprise/orgs/${id}/bulk-import`, { students });
    return res.data.data;
  },

  getAnalytics: async (): Promise<EnterpriseAnalytics> => {
    const res = await axiosClient.get('/admin/enterprise/analytics');
    return res.data.data;
  },
};
