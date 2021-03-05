

// 前补零（str不能为空，否则会少一位TT）
export const fixZeroStart = (str, n) => {
    return (Array(n).join('0') + str).slice(-n)
}

// 后补零（str不能为空，否则会少一位TT）
export const fixZeroEnd = (str, n) => {
    return (str + Array(n).join('0')).slice(0, n)
}