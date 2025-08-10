"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Eye, EyeOff, Shield, ArrowLeft, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useVerifySignInMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import VerifyOtp from "@/components/pages/VerifyOtp";
import { signIn } from "next-auth/react";
import { UserRole } from "@/enum";

export default function LoginPage() {
  const [verifySignIn, { isLoading }] = useVerifySignInMutation();
  const [openOtp, setOpenOtp] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onsubmit = async (data: FieldValues) => {
    try {
      const response = await verifySignIn(data).unwrap();
      console.log(response, "res", response);
      const callbackUrl =
        response?.data?.role == UserRole.STUDENT ? "/dashboard" : "/admin";
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl,
        redirect: true,
      });
    } catch (error: any) {
      toast.error(
        error.data?.message || error?.message || "Something went wrong"
      );
      if (error?.status == 403) {
        setEmail(data.email);
        setOpenOtp(true);
      }
    }
  };

  if (openOtp && email) {
    return <VerifyOtp email={email as string} setOpen={setOpenOtp} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 rounded-full p-3">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your Test_School account</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)}>
            <Card className="border-2 shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-center">Sign In</CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="Enter your email address"
                          className="h-11"
                          {...field}
                        />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-center">
                  <FormField
                    control={form.control}
                    name="isRemember"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-gray-600 leading-relaxed">
                          <div>
                            <Label
                              htmlFor="isRemember"
                              className="text-sm text-gray-600 leading-relaxed"
                            >
                              Remember me
                            </Label>
                          </div>
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-blue-600 leading-relaxed"
                  >
                    Forgot password?
                  </Label>
                </div>

                <Button
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 flex items-center"
                  type="submit"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      Signing In
                      <Loader className="w-5 h-5 animate-spin" />
                    </span>
                  ) : (
                    <span> Sign In</span>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  {"Don't have an account? "}
                  <Link
                    href="/register"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign up here
                  </Link>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
        {/* Security Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">
                Secure Assessment Environment
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Your assessment sessions are protected with advanced security
                measures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
