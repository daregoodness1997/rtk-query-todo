import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Mock API
// https://mockapi.io/projects/630f85f1498924524a90176d

// The API Slice

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://630f85f1498924524a90176c.mockapi.io/api/v1',
  }),
  tagTypes: ['Todos'],
  endpoints: builder => ({
    getTodos: builder.query({
      query: () => '/todos',
      transformResponse: res => res.sort((a, b) => b.id - a.id),
      providesTags: ['Todos'],
    }),
    addTodo: builder.mutation({
      query: todo => ({
        url: '/todos',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation({
      query: todo => ({
        url: `/todos/${todo.id}`,
        method: 'PUT',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
