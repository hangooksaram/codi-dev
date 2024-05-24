import { useSelector } from "react-redux"
import theme from "./theme"
import { selectAccessibilityOption } from "@/features/accessibility/accessibilitySlice"

export default function dynamicColor (color:string){
    const accessibilityOption = useSelector(selectAccessibilityOption);
    const {secondary, primary, assist, text} = theme.colors;

    switch (color){
        case secondary.normal:{
            if(accessibilityOption.retinal.isActivated){
                return secondary.strong;
            }
            return color;
        }
        case text.strong:{
            if(accessibilityOption.retinal.isActivated){
                return text.normal;
            }
            return color;
        }

        default :return color;
    }
}
