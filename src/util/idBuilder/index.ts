let num = 1

export default (key: number) => {
    return `${key}-${new Date().getTime().toString().substring(9)}-${Math.floor(Math.random() * 100 * num++)}`
}