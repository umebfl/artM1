
// Todo 1. 渲染耗时计算及提示

export enum level {
    debug,
    info,
    warning,
    error,
}

export let logState = []
let logCurrentLv = level.debug

export const debug = msg => {
    log(level.debug, msg)
}
export const info = msg => {
    log(level.info, msg)
}
export const warning = msg => {
    log(level.warning, msg)
}
export const error = msg => {
    log(level.error, msg)
}
export const clear = () => {
    logState = []
}

const log = (lv: level, msg: String) => {

    logState = [
        {
            id: `${logState.length}`,
            lv,
            msg,
            time: new Date(),
        },
        ...logState,
    ]
}
