import { apiCall } from './apiService';

export interface Course {
  _id: string;
  name: string;
  subjectId: string;
  isCompleted: boolean;
  completionDate?: string;
}

export const courseService = {
  getBySubject: async (subjectId: string): Promise<Course[]> => {
    return apiCall(`/courses/${subjectId}`);
  },

  create: async (data: Omit<Course, '_id' | 'isCompleted'>): Promise<Course> => {
    return apiCall('/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateProgress: async (id: string, isCompleted: boolean): Promise<Course> => {
    return apiCall(`/courses/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ isCompleted }),
    });
  },
};
