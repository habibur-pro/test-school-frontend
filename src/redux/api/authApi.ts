import baseApi from "../baseApi";
import { tagTypes } from "../tagList";

const ENDPOINT = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // user sign-up api endpoint
    signUp: build.mutation({
      query: (signUpData) => ({
        url: `${ENDPOINT}/signup`,
        method: "POST",
        body: signUpData,
      }),
      invalidatesTags: [tagTypes.AUTH],
    }),
    // user sign-in api
    verifySignIn: build.mutation({
      query: (signinData) => ({
        url: `${ENDPOINT}/verify-signin`,
        method: "POST",
        body: signinData,
      }),
      invalidatesTags: [tagTypes.AUTH],
    }),
    // verify otp
    verifyOtp: build.mutation({
      query: (signinData) => ({
        url: `${ENDPOINT}/verify-otp`,
        method: "POST",
        body: signinData,
      }),
      invalidatesTags: [tagTypes.AUTH],
    }),
    // resend otp
    resendOtp: build.mutation({
      query: (signinData) => ({
        url: `${ENDPOINT}/resend-otp`,
        method: "POST",
        body: signinData,
      }),
      invalidatesTags: [tagTypes.AUTH],
    }),
  }),
});

export const {
  useSignUpMutation,
  useVerifySignInMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
} = authApi;
