export function debounce (fn: typeof Function, delay: number) {
    let timeoutID: number
    return function () {
        clearTimeout(timeoutID)
        let args = arguments
        timeoutID = setTimeout(function () {
            fn.apply(args)
        }, delay)
    }
}