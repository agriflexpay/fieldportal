import axios from "axios";
import { signIn, signOut } from "next-auth/react";
const authApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
});
import { User_type } from "../types/index";
export const authUrlEndpoint = "/api/user";

export const verifyCredentials = async (credentials:any) => {
    const email: string = credentials?.email;
    const password: string = credentials?.password;
    const response = await authApi.post(`${authUrlEndpoint}/login`, {
        email,
        password,
    },{headers:{'Content-Type':'application/json'}}).then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            // return error;
            throw new Error(error.response.data.error);
        });
    return response;
};

export const handleSignIn = async (data:any) => {
    const email: string = data?.email;
    const password: string = data?.password;
    const response = await signIn("credentials", {
        email: email,
        password: password,
        redirect:false,
        callbackUrl:'/home'
    });
    return response;
};

export const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/signin" });
};

export const registerUser = async ({ data }) => {
    const response = await authApi.post(`${authUrlEndpoint}/regsiter`, data);
    return response.data.data;
};
