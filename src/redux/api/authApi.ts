import baseApi from "../baseApi";
import { tagTypes } from "../tagList";

const ENDPOINT = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // user sign-up api endpoint
    signUp: build.mutation({
      query: (signUpData) => ({
        url: `${ENDPOINT}/sign-up`,
        method: "POST",
        body: signUpData,
      }),
      invalidatesTags: [tagTypes.AUTH],
    }),
    // user sign-in api
    verifySignIn: build.mutation({
      query: (signinData) => ({
        url: `${ENDPOINT}/verify-sign-in`,
        method: "POST",
        body: signinData,
      }),
      invalidatesTags: [tagTypes.AUTH],
    }),
  }),
});

export const { useSignUpMutation, useVerifySignInMutation } = authApi;
