import {useAppDispatch, useAppSelector} from "common/hooks";
import {selectIsLoggedIn, selectThemeMode, setIsLoggedIn} from "../../../../app/appSlice";
import {getTheme} from "common/theme";
import {useLoginMutation} from "../../api/authApi";
import {SubmitHandler, useForm} from "react-hook-form";
import {ResultCode} from "common/enums";
export  type Inputs = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export const useLogin = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch()

    const [login] = useLoginMutation()

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: { email: '', password: '', rememberMe: false } })

    const onSubmit: SubmitHandler<Inputs> = data => {
        login(data)
            .then(res => {
                if (res.data?.resultCode === ResultCode.Success) {
                    dispatch(setIsLoggedIn({ isLoggedIn: true }))
                    localStorage.setItem('sn-token', res.data.data.token)
                }
            })
            .finally(() => {
                reset()
            })
    }

    return { isLoggedIn, theme, handleSubmit, onSubmit, control, errors, register }
}