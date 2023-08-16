import { isMobile } from "./isMobile"

export const minPageHeight = () => {
    const scrollHeight = document.documentElement.clientHeight

    return isMobile() ? `${scrollHeight - 161}px` : `${scrollHeight - 185}px`
} 