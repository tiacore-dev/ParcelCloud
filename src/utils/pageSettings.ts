import { isMobile } from "./isMobile"

export const minPageHeight = () => {
    return isMobile() ? "calc(100vh - 161px)" : "calc(100vh - 185px)"
} 