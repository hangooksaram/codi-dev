import { Breakpoints, device } from "@/ui/theme";

export const hideOn = (breakpoint:Breakpoints )=> ({
    [device(breakpoint)]: {
        display:'none'
    }
})
