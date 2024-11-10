import {AppDispatch} from "../../app/store";
import {BaseResponse} from "common/types";
import {setAppStatus, setError} from "../../app/appSlice";

export const handleServerError = <T>(dispatch: AppDispatch, data: BaseResponse<T>) => {
    dispatch(setAppStatus({status: 'failed'}))
    dispatch(setError({error: data.messages.length ? data.messages[0] : 'some error occurred'}))
}