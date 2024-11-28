import {BaseResponse} from "common/types";
import {baseApi} from "../../../app/baseApi";
import {Inputs} from "../lib/hooks/useLogin";


export const authApi = baseApi.injectEndpoints({
   endpoints: (build) => {
       return {
           me: build.query<BaseResponse<{id: number, email: string, login: string}>, void>({
               query: () => 'auth/me',
           }),
           login: build.mutation<BaseResponse<{userId: number, token: string}>,  Inputs >({
               query: (body) => {
                   return {
                       url: 'auth/login',
                       method: 'POST',
                       body
                   }
               },
           }),
           logout: build.mutation<BaseResponse, void>({
               query: () => {
                   return {
                       url: 'auth/login',
                       method: 'DELETE'
                   }
               },
           })
       }
   }
})

export const {useMeQuery, useLoginMutation, useLogoutMutation} = authApi
