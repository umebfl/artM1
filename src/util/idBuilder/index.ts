let num = 1

export default (key: number) => {
    return `${key}-${new Date().getTime()}-${Math.floor(Math.random() * 100 * num++)}`
}