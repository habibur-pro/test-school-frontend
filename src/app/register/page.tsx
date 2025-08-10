"use client";

import { useState } from "react";
import { Shield, ArrowLeft, Loader } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import VerifyOtp from "@/components/pages/VerifyOtp";

export default function RegisterPage() {
  const [signup, { isLoading }] = useSignUpMutation();
  const [openVerify, setOpenVerify] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: true,
      agreeToMarketing: false,
    },
  });

  const onsubmit = async (data: FieldValues) => {
    try {
      const response = await signup(data).unwrap();
      console.log(response);
      setOpenVerify(true);
      setEmail(data.email);
    } catch (error: any) {
      toast.error(
        error.data?.message || error?.message || "Something went wrong"
      );
    }
  };
  if (openVerify && email) {
    return <VerifyOtp email={email} setOpen={setOpenVerify} />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Join Test_School and start your digital competency journey
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)}>
            <Card className="border-2 shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-center">Sign Up</CardTitle>
                <CardDescription className="text-center">
                  Fill in your details to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            id="firstName"
                            placeholder="Enter your first name"
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            id="lastName"
                            placeholder="Enter your last name"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                          placeholder="Create a strong password"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Terms and Conditions */}
                <FormField
                  control={form.control}
                  name="agreeToTerms"
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
                        <Label
                          htmlFor="terms"
                          className="text-sm text-gray-600 leading-relaxed"
                        >
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Privacy Policy
                          </Link>
                        </Label>
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 flex items-center"
                  type="submit"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      Creating Account
                      <Loader className="w-5 h-5 animate-spin" />
                    </span>
                  ) : (
                    <span>Create Account</span>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in here
                  </Link>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
