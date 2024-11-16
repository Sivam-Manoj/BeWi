import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include",
});

const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});

export default apiSlice;
