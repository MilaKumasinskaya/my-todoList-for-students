import {AppDispatch} from "../../app/store";
import {setAppStatus, setError} from "../../app/appSlice";

export  const handleNetworkError = (dispatch: AppDispatch, err: {message: string}) => {
    dispatch(setAppStatus({status: 'failed'}))
    dispatch(setError({error: err.message}))
}