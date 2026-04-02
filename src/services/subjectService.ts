import { apiCall } from './apiService';

export interface Subject {
  _id: string;
  name: string;
  batchId: string;
}

export const subjectService = {
  getByBatch: async (batchId: string): Promise<Subject[]> => {
    return apiCall(`/subjects/${batchId}`);
  },

  create: async (data: Omit<Subject, '_id'>): Promise<Subject> => {
    return apiCall('/subjects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
