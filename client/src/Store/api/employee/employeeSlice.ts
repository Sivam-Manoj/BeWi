import apiSlice from "../apiSlice";

interface Employee {
  _id?: string;
  username: string;
  email: string;
  role: string;
}

const API_ENDPOINT: string = "/employee";

const employeeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeApi: builder.query<Employee[], void>({
      query: () => ({
        url: `${API_ENDPOINT}/get-all`,
      }),
    }),
    addnewEmployeeApi: builder.mutation({
      query: (data: Omit<Employee, "_id">) => ({
        url: `${API_ENDPOINT}/add-employee`,
        method: "POST",
        body: data,
      }),
    }),
    updateEmployeeApi: builder.mutation({
      query: ({ id, data }: { id: string; data: Partial<Employee> }) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteEmployeeApi: builder.mutation({
      query: (id: string) => ({
        url: `${API_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetEmployeeApiQuery,
  useAddnewEmployeeApiMutation,
  useUpdateEmployeeApiMutation,
} = employeeSlice;
export default employeeSlice.reducer;
