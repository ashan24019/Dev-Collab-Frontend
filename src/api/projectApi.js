import axiosInstance from './axiosInstance';

export const getAllProjects = async (page = 0, size = 10) => {
    const response = await axiosInstance.get('/api/projects', {
        params: {page, size}
    });
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

export const addMemberToProject = async (projectId, userId) => {
    const response = await axiosInstance.patch(`/api/projects/${projectId}/members/${userId}`);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axiosInstance.get('/api/users');
    return response.data;
};
