import axios from 'axios'

const userApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
});

export const PlanUrlEndpoint = "/api/bookings";


export const createBookings = async ({ data, authtoken }) => {
    const response = await userApi.post(`${PlanUrlEndpoint}/create`,data,{headers:{'Content-Type': 'application/json','x-access-token':authtoken}});
    return response.data.data;
}
export const getBookingsByUser = async ({ id,authtoken }) => {
    const response = await userApi.get(`${PlanUrlEndpoint}/user/${id}`,{headers:{'Content-Type': 'application/json','x-access-token':authtoken}});
    return response.data.data;
}
