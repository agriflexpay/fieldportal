import axios from 'axios'

const userApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
});

export const PlanUrlEndpoint = "/api/businessplan";


export const getPlans = async ({ id, authtoken }) => {
    const response = await userApi.get(`${PlanUrlEndpoint}/agency/${id}`,{headers:{'Content-Type': 'application/json','x-access-token':authtoken}});
    return response.data.data;
}
export const myPlans = async ({ authtoken }) => {
    const response = await userApi.get(`${PlanUrlEndpoint}/myplans`,{headers:{'Content-Type': 'application/json','x-access-token':authtoken}});
    return response.data.data;
}
