import { useEffect, useRef } from 'react';
import parse from 'html-react-parser';

function ShowTextData({ data }) {
    const textRef = useRef();

    useEffect(() => {
        const divElement = textRef.current;
        if (divElement) {
            const listError = divElement.getElementsByClassName('ck-widget__type-around');
            for (let i = 0; i < listError.length; i++) {
                const error = listError[i];
                error.style.display = 'none';
            }
        }
    }, []);

    if (data) {
        const textComponent = parse(data);
        //const errorList = textComponent.getElementsByClassName('ck-widget__type-around');
        return <div ref={textRef}>{textComponent}</div>;
    }

    return <div></div>;
}

export default ShowTextData;
