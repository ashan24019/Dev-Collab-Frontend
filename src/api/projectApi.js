import axiosInstance from './axiosInstance';

export const getAllProjects = async () => {
    const response = await axiosInstance.get('/api/projects');
    return response.data;
}

export const createProject = async (data) => {
    const response = await axiosInstance.post('/api/projects', data);
    return response.data;
}

export const getProjectById = async (id) => {
    const response = await axiosInstance.get(`/api/projects/${id}`);
    return response.data;
}
