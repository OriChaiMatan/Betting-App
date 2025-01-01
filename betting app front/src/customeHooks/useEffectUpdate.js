import { useEffect, useRef } from "react"

export function useEffectUpdate(cb, dependencies) {
    const isFirstRender = useRef(true)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        return cb()
    }, dependencies)
}