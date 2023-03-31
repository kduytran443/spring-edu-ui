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

            const listEmptyError = divElement.querySelectorAll('.ck.ck-reset_all.ck-widget__resizer');
            for (let i = 0; i < listEmptyError.length; i++) {
                const error = listEmptyError[i];
                error.style.display = 'none';
            }

            const listEmptyFake = divElement.querySelectorAll('.ck-fake-selection-container');
            for (let i = 0; i < listEmptyFake.length; i++) {
                const error = listEmptyFake[i];
                error.style.display = 'none';
            }
        }
    }, []);

    if (data) {
        const textComponent = parse(data);
        //const errorList = textComponent.getElementsByClassName('ck-widget__type-around');
        return (
            <div className="max-w-full overflow-hidden" ref={textRef}>
                {textComponent}
            </div>
        );
    }

    return <div></div>;
}

export default ShowTextData;
