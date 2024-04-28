// hooks/useScript.js
import { useEffect, useState } from 'react';

const useScript = (url, callback) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;

        script.onload = () => callback && callback();

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [url, callback]);
};

export default useScript;
