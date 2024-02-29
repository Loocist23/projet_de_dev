import { useState, useEffect } from 'react';

const useMyTextInput = (initialValue, callback = null) => {
    const [value, setValue] = useState(initialValue);
    const [timer, setTimer] = useState(null);

    const handleChange = (newValue) => {
        setValue(newValue);

        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            if (callback) {
                callback(newValue);
            }
        }, 1000);

        setTimer(newTimer);
    };

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    return [value, handleChange];
};

export default useMyTextInput;
