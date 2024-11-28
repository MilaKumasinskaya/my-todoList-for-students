import {
    BaseQueryApi,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    QueryReturnValue,
} from '@reduxjs/toolkit/dist/query/react'
import { ResultCode } from 'common/enums'
import {setError} from "../../app/appSlice";

export const handleError = (
    api: BaseQueryApi,
    result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
    let error = 'Some error occurred'

    if (result.error) {
        switch (result.error.status) {
            case 'FETCH_ERROR':
            case 'PARSING_ERROR':
            case 'CUSTOM_ERROR':
                error = result.error.error
                break

            case 403:
                error = '403 Forbidden Error. Check API-KEY'
                break
            case 401:
                error = '401 Error. Check token'
                break

            case 400:
            case 500:
                error = (result.error.data as { message: string }).message
                break

            default:
                error = JSON.stringify(result.error)
                break
        }
        api.dispatch(setError({ error }))
    }

    if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
        const messages = (result.data as { messages: string[] }).messages
        error = messages.length ? messages[0] : error
        api.dispatch(setError({ error }))
    }
}