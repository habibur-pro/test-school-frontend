import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypeList } from "./tagList";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_API_BASEURL as string,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
export default baseApi;
