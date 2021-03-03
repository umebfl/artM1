export default (key: number) => {
    return `${key}-${new Date().getTime()}`
}