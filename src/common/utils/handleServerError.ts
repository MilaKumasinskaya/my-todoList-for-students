import {setAppStatusAC, setErrorAC} from "../../app/app-reducer";
import {AppDispatch} from "../../app/store";
import {BaseResponse} from "common/types";

export const handleServerError = <T>(dispatch: AppDispatch, data: BaseResponse<T>) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setErrorAC(data.messages.length ? data.messages[0] : 'some error occurred'))
}