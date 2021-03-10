
interface timePayload {
    mod: string
    start: Date
    end: Date
    // ms
    take: number
}

export let timeState: timePayload[] = []

export function calTime(mod: string): {start: () => void, end: () => void} {
    let start = new Date()

    return {
        start: () => {
            start = new Date()
        },
        end: () => {
            const end = new Date()
            timeState = [
                ...timeState,
                {
                    mod,
                    start: start ? start : new Date(),
                    end,
                    take: end.getTime() - start.getTime(),
                }
            ]
        }
    }
}