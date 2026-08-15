import axiosClient from './axiosClient';

export type ActivityType = 'IMPOSSIBLE_SPEED' | 'RATE_LIMIT_EXCEEDED' | 'BOT_TYPING_PATTERN' | 'SCRIPT_USER_AGENT';
export type ActionTaken = 'FLAGGED' | 'WARNING_SENT' | 'ACCOUNT_SUSPENDED' | 'RESOLVED_SAFE';

export interface CheatLog {
  id: number;
  userId?: number;
  username: string;
  ipAddress: string;
  activityType: ActivityType;
  activityTypeName: string;
  confidenceScore: number;
  detailReason: string;
  actionTaken: ActionTaken;
  createdAt: string;
}

export interface SecurityOverview {
  totalThreatsDetected: number;
  flaggedUsersCount: number;
  suspendedUsersCount: number;
  systemSecurityScore: number;
}

export const adminAntiCheatApi = {
  getLogs: async (): Promise<CheatLog[]> => {
    const res = await axiosClient.get('/admin/anti-cheat/logs');
    return res.data.data;
  },

  getOverview: async (): Promise<SecurityOverview> => {
    const res = await axiosClient.get('/admin/anti-cheat/overview');
    return res.data.data;
  },

  takeAction: async (logId: number, action: ActionTaken): Promise<CheatLog> => {
    const res = await axiosClient.post(`/admin/anti-cheat/logs/${logId}/action`, { action });
    return res.data.data;
  },
};
