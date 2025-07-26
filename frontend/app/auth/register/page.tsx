"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Mail, Lock, Eye, EyeOff, User, Car } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRegister } from "@/services/auth.service"

// Validation schema
const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.enum(["user", "captain"], {
        required_error: "Please select your role",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof schema>

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [redirecting, setRedirecting] = useState(false)
    const { mutateAsync: register, isPending: isRegisterPending, isError: isRegisterError, error: registerError } = useRegister()
    const router = useRouter()

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: undefined,
        },
    })

    const onSubmit = async (data: RegisterFormValues) => {
        const { confirmPassword, ...registerData } = data
        const response = await register(registerData)
        if (!response.user) {
            setRedirecting(true)
            router.push('/auth/login')
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-slate-100/50"></div>
            <div className="absolute top-20 left-20 w-32 h-32 bg-green-400/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-400/5 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-400/3 rounded-full blur-lg"></div>

            <div className="relative z-10 w-full max-w-md">
                {redirecting ? (
                    <RedirectingUI />
                ) : (
                    <Card className="shadow-xl border-0 bg-white">
                        <CardHeader className="text-center space-y-4 relative">
                            <div className="mx-auto w-16 h-16 bg-green-400 rounded-2xl flex items-center justify-center">
                                <Car className="h-8 w-8 text-white" />
                            </div>

                            <div>
                                <CardTitle className="text-2xl font-bold text-slate-400">Join RickshawX</CardTitle>
                                <CardDescription className="text-slate-400 mt-2">
                                    Create your account to start riding or driving
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Error Alert */}
                            {isRegisterError && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {registerError?.message || "Registration failed. Please try again."}
                                </div>
                            )}

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-700 font-medium">Full Name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                        <Input
                                                            placeholder="Enter your full name"
                                                            className="pl-10 border-slate-200 focus:border-green-400 focus:ring-green-400 h-11"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-700 font-medium">Email Address</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                        <Input
                                                            placeholder="Enter your email"
                                                            className="pl-10 border-slate-200 focus:border-green-400 focus:ring-green-400 h-11"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-700 font-medium">Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="Enter your password"
                                                            className="pl-10 pr-10 border-slate-200 focus:border-green-400 focus:ring-green-400 h-11"
                                                            {...field}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute right-1 top-1 h-9 w-9 p-0 hover:bg-slate-100"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="h-4 w-4 text-slate-400" />
                                                            ) : (
                                                                <Eye className="h-4 w-4 text-slate-400" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-slate-700 font-medium">Confirm Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                                        <Input
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            placeholder="Confirm your password"
                                                            className="pl-10 pr-10 border-slate-200 focus:border-green-400 focus:ring-green-400 h-11"
                                                            {...field}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute right-1 top-1 h-9 w-9 p-0 hover:bg-slate-100"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff className="h-4 w-4 text-slate-400" />
                                                            ) : (
                                                                <Eye className="h-4 w-4 text-slate-400" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel className="text-slate-700 font-medium">I want to join as</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                        className="grid grid-cols-2 gap-4"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="user" id="user" />
                                                            <label
                                                                htmlFor="user"
                                                                className="flex-1 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 flex items-center space-x-3"
                                                            >
                                                                <User className="h-5 w-5 text-blue-400" />
                                                                <div>
                                                                    <div className="font-medium text-slate-400">Rider</div>
                                                                    <div className="text-xs text-slate-400">Book rides</div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="captain" id="captain" />
                                                            <label
                                                                htmlFor="captain"
                                                                className="flex-1 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 flex items-center space-x-3"
                                                            >
                                                                <Car className="h-5 w-5 text-green-400" />
                                                                <div>
                                                                    <div className="font-medium text-slate-400">Driver</div>
                                                                    <div className="text-xs text-slate-400">Drive & earn</div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full h-11 bg-green-400 hover:bg-green-600 text-white font-medium"
                                        disabled={isRegisterPending}
                                    >
                                        {isRegisterPending ? "Creating Account..." : "Create Account"}
                                    </Button>
                                </form>
                            </Form>

                            {/* Login link */}
                            <div className="text-center pt-4 border-t border-slate-100">
                                <p className="text-sm text-slate-600">
                                    Already have an account?{" "}
                                    <Link
                                        href="/auth/login"
                                        className="text-green-400 hover:text-green-600 font-medium"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

function RedirectingUI() {
    return (
        <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-400 rounded-2xl flex items-center justify-center mb-4">
                    <Car className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-green-600">Account Created!</CardTitle>
                <CardDescription>
                    Redirecting you to the login page...
                </CardDescription>
            </CardHeader>
        </Card>
    )
}