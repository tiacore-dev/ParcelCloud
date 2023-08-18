import { isMobile } from "./isMobile"

export const minPageHeight = () => {
    const clientHeight = document.documentElement.clientHeight

    return isMobile() ? `${clientHeight - 161}px` : `${clientHeight - 185}px`
} 

export const minLeftMenuHeight = () => {
    console.log('clientHeight', document.documentElement.clientHeight)
    console.log('offsetHeight', document.documentElement.offsetHeight)
    console.log('scrollHeight', document.documentElement.scrollHeight)


    const clientHeight = document.documentElement.clientHeight

    return `${clientHeight - 161}px`
}