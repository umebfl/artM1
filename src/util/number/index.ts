

// 生成若干组随机数，每组的元素个数及总和均固定。
export const randGenerator = (n: number, sum: number) {
    let aryRet = []
    let fSumTmp = sum
    let iAcc = 0
    for (var i = 0; i < (n - 1); i++) {
        let iTmp = Math.ceil(Math.random() * (fSumTmp / 2))
        aryRet.push(iTmp)
        fSumTmp -= iTmp
        iAcc += iTmp
    }

    aryRet.push(sum - iAcc)
    return aryRet
}

//   console.log(randGenerator(5, 180)) //[21, 20, 27, 7, 2, 6, 17]