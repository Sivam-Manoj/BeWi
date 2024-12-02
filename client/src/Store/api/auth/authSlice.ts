import apiSlice from "../apiSlice";

const API_ENDPOINTS: string = "/auth";

const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginApi: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS}/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginApiMutation } = authSlice;
export default authSlice.reducer;
