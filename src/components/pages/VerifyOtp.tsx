"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Shield, Loader, Timer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  verifyOtpSchema,
  VerifyOtpFormData,
} from "@/validation/auth.validation";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "@/redux/api/authApi";
import { useRouter } from "next/navigation";

export default function VerifyOtp({
  email,
  setOpen,
}: {
  email: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [timer, setTimer] = useState(150); // countdown in seconds
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const router = useRouter();
  const form = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // submit OTP
  const onSubmit = async (data: FieldValues) => {
    try {
      await verifyOtp(data).unwrap();
      toast.success("OTP verified successfully! please login");
      setOpen(false);
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Invalid OTP");
    }
  };

  // resend OTP
  const handleResendOtp = async () => {
    try {
      await resendOtp({ email }).unwrap();
      toast.success("OTP resent successfully");
      setTimer(60);
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Failed to resend OTP"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/login"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 rounded-full p-3">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify OTP</h1>
          <p className="text-gray-600">
            Enter the OTP sent to your email <br />
            <span className="text-sm text-gray-500">
              (Check your spam/junk folder too)
            </span>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="border-2 shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl text-center">Enter OTP</CardTitle>
                <CardDescription className="text-center">
                  Your OTP will expire in {timer} seconds
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter 6-digit OTP"
                          className="h-11 text-center tracking-widest text-lg"
                          maxLength={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      Verifying
                      <Loader className="w-5 h-5 animate-spin" />
                    </span>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>

                {/* Resend OTP */}
                <div className="text-center text-sm text-gray-600">
                  {timer > 0 ? (
                    <span className="flex justify-center items-center gap-1">
                      <Timer className="w-4 h-4" /> Resend available in {timer}s
                    </span>
                  ) : (
                    <Button
                      type="button"
                      variant="link"
                      onClick={handleResendOtp}
                      disabled={isResending}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {isResending ? "Resending..." : "Resend OTP"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
