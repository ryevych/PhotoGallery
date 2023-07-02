import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPhoto } from "../../models/IPhoto";

export const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    fetchAllPhotos: builder.query<IPhoto[], number>({
      query: (limit: number = 10) => ({
        url: "/photos",
        params: {
          _limit: limit,
          albumId: 1,
        },
      }),
    }),
  }),
});
