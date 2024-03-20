import axios from 'axios'

const userApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
});

export const userUrlEndpoint = "/api/user";

export const signInUser = async ({ email, password }) => {
    const response = await userApi.post(`${userUrlEndpoint}/login`, {
            email,
            password,
        })
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw new Error(error.response.data.error);
        });
    return response;
}

export const registerUser = async ({ data}) => {
    const response = await userApi.post(`${userUrlEndpoint}/register`, data);
    return response.data.data;
}

export const updateUser = async ({ data, authtoken }) => {
    const response = await userApi.put(`${userUrlEndpoint}/update`, data,{headers:{'Content-Type': 'application/json','x-access-token':authtoken}});
    return response.data.data;
}