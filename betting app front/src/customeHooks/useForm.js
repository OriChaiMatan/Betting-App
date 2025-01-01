import { useState } from "react"
import { useEffectUpdate } from "./useEffectUpdate"

export function useForm(initialState, cb) {
    const [fields, setFields] = useState(initialState)

    useEffectUpdate(() => {
        cb?.(fields)
    }, [fields])

    function handleChange({ target }) {
        const { name, value } = target
        setFields((prevFields) => ({ ...prevFields, [name]: value }))
    }

    return [fields, handleChange]
}
