import { useState, useEffect, useRef } from "react";

function useDebounce(changedValue, delayTime) {
    // State to store the debounced value
    const [debouncedValue, setDebouncedValue] = useState(changedValue);

    const timeoutRef = useRef(null);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (!changedValue != true) {
            timeoutRef.current = setTimeout(() => {
                setDebouncedValue(changedValue);
            }, delayTime);
        } else {
            setDebouncedValue(changedValue);
        }

        // Clear the timeout if changedValue changes before delayTime
        return () => clearTimeout(timeoutRef.current);
    }, [changedValue, delayTime, timeoutRef]);

    return debouncedValue;
}

export default useDebounce;
