export type ThemeMode = "dark" | "light"
type InitialState = typeof initialState
const initialState = {
  themeMode: "light" as ThemeMode,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE-THEME": {
      return { ...state, themeMode: action.payload.themeMode }
    }
    default:
      return state
  }
}
export const changeThemeAC = (themeMode: ThemeMode) => {
  return { type: "CHANGE-THEME", payload: { themeMode } } as const
}
export type ChangeThemeAT = ReturnType<typeof changeThemeAC>
type ActionsType = ChangeThemeAT
