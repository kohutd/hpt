export function isDigit(value) {
    return /[0-9]/.test(value);
}

export function last(arr) {
    return arr[arr.length - 1];
}

export function lastN(arr, n) {
    return arr.slice(arr.length - n);
}


export function firstN(arr, n) {
    return arr.slice(0, n);
}
