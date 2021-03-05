
import R from 'ramda'

interface WhenPayload {
    node: () => void
    test: any
}
export const When = (payload: WhenPayload) => {

    const {
        node,
        test,
    } = payload

    return (
        test ?  node() : null
    )
}

interface IfElsePayload {
    fnode: () => void
    tnode: () => void
    test: any
}
export const IfElse = (payload: IfElsePayload) => {

    const {
        tnode,
        fnode,
        test,
    } = payload

    return test ?  tnode() : fnode()
}

interface RMapPayload {
    node: (val: any, key: number) => void
    data: any[]
}
export const RMap = (payload: RMapPayload) => {

    const {
        node,
        data,
    } = payload

    return (
        R.addIndex(R.map)(
            node
        )(data)
    )
}