import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// The API Slice

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: builder => ({
    getTodos: builder.query({
      query: () => '/todos',
    }),
    addTodo: builder.mutation({
      query: todo => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
    }),
    updateTodo: builder.mutation({
      query: todo => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
    }),
  }),
});

export const { useGetTodosQuery } = apiSlice;
