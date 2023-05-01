import { changeLayoutModeAction, changeLayoutThemeModeAction } from "./reducer";
import { changeHTMLAttribute } from "./utils";

//footer mood
export const changeLayoutMood = (footerMode) => async (dispatch) => {
    try {
        changeHTMLAttribute("data-footer", footerMode)
        dispatch(changeLayoutModeAction(footerMode))
    } catch (error) { }
}
//them mood
export const changeThemeMood = (themeMode) => async (dispatch) => {
    try {
        changeHTMLAttribute("data-bs-theme", themeMode)
        dispatch(changeLayoutThemeModeAction(themeMode))
    } catch (error) { }
}