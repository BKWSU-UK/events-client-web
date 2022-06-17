const { useState } = require('react')

/**
 * Used for the local storage.
 * @param key
 * @param initialValue
 * @returns {[any | undefined, setValue]}
 */
const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue
        }
        try {
            const item = window?.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch(error) {
            console.error(`Cannot access ${key}`, error)
            return initialValue
        }
    })

    const setValue = (value) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        try {
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch(error) {
            console.error(`Cannot write ${valueToStore} to ${key}`, error)
        }
    }

    return [storedValue, setValue]
}

export default useLocalStorage