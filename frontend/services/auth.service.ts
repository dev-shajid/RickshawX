"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import {
    User,
    Token,
    LoginRequest,
    BaseRegisterRequest,
} from "@/types/user"
import { signIn, SignInResponse, signOut } from "next-auth/react"
import { queryClient } from "../lib/query-client"
import axiosInstance from "./api"
import { handleApiErrorWithToast, showSuccessToast } from "@/lib/api-error-handler"

// Auth API functions using axios
export const authAPI = {

    // Get current user profile
    getCurrentUser: async (): Promise<User> => {
        const response = await axiosInstance.get<User>("/auth/me")
        return response.data
    }
}

// React Query hooks
export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginRequest): Promise<SignInResponse> => {
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            })
            return response as SignInResponse
        },
        onSuccess: async (data) => {
            if (data.error) {
                let message = "An unexpected error occurred. Please try again."
                if (data.error === "CredentialsSignin") {
                    message = "Invalid email or password"
                }

                handleApiErrorWithToast(new Error(message), { title: "Login failed", description: message })
                return;
            }
            // Show success message
            showSuccessToast("Login successful", `Welcome back!`)
        },
        onError: (error) => {
            handleApiErrorWithToast(error, { title: "Login failed" })
        },
    })
}

export const useRegister = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: async (data: BaseRegisterRequest): Promise<Token> => {
            if (data.role == 'user') {
                const response = await axiosInstance.post<Token>("/user/register", data)

                if (response.status < 400) {
                    await signIn("credentials", {
                        email: data.email,
                        password: data.password,
                        redirect: true,
                    })
                }

                return response.data
            } else {
                const response = await axiosInstance.post<Token>("/captain/register", data)

                if (response.status < 400) {
                    await signIn("credentials", {
                        email: data.email,
                        password: data.password,
                        redirect: true,
                    })
                }

                return response.data
            }
        },
        onSuccess: (result) => {
            console.log(result)
            // Invalidate and refetch user data
            queryClient.invalidateQueries({ queryKey: ["user"] })

            // Show success message
            showSuccessToast("Account created successfully", "Welcome to MediTrack!")

            router.push("/auth/login")
        },
        onError: (error) => {
            handleApiErrorWithToast(error)
        },
    })
}


// Logout function
export const logout = async () => {
    try {
        await axiosInstance.post("/auth/logout")
    } catch (error) {
        console.warn("Logout API call failed:", error)
    } finally {
        showSuccessToast("Logged out successfully")
        await signOut({
            redirectTo: "/auth/login",
        })
    }
}