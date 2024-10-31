import {setAppStatusAC, setErrorAC} from "../../app/app-reducer";
import {AppDispatch} from "../../app/store";

export  const handleNetworkError = (dispatch: AppDispatch, err: {message: string}) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setErrorAC(err.message))
}