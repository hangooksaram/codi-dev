import { useSelector } from "react-redux"
import theme from "./theme"
import { selectDisabilityOption } from "@/features/webAccessibility/webAccessibilitySlice"

export default function dynamicColor (color:string){
    const disabilityOption = useSelector(selectDisabilityOption);
    const {secondary, primary, assist, text} = theme.colors;

    switch (color){
        case secondary.normal:{
            if(disabilityOption.retinal.isActivated){
                return secondary.strong;
            }
            return color;
        }
        case text.strong:{
            if(disabilityOption.retinal.isActivated){
                return text.normal;
            }
            return color;
        }
    }
}
