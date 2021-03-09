
// Fisher–Yates shuffle 洗牌算法
// 实现真正意义上的完全乱序
export const shuffle = (arr: any[]) => {
    var l = arr.length
    var index, temp
    while(l>0){
        index = Math.floor(Math.random()*l)
        temp = arr[l-1]
        arr[l-1] = arr[index]
        arr[index] = temp
        l--
    }
    return arr
}