
import {useState} from 'react';

const useEdit = () => {

    const [inputValue, setInputValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [textArea, setTextArea] = useState('');
    const [upperInputValue, setUpperInputValue] = useState('');


    const handleChangeInput = (prop) => {
        event.preventDefault();
        setInputValue(prop.toUpperCase());
    };

    const handleChangeUpperInput = (prop) => {
        event.preventDefault();
        setUpperInputValue(prop.toUpperCase());
    };

    const clearInput = () => {
        setInputValue("");
        setUpperInputValue("");
    }

    const handleChangeEmail = (prop) => {
        event.preventDefault();
        setEmailValue(prop.toLowerCase());
    };

    const clearEmail = () => {
        setEmailValue("");
    }

    const handleChangeSelect = (prop) => {
    event.preventDefault();
    setSelectValue(prop);
    };

    const clearSelect = () => {
    setSelectValue();
    }

    const handleChangeTextArea = (prop) => {
        event.preventDefault();
        setTextArea(prop.toUpperCase());
    }

    const clearTextArea = () => {
        setTextArea("");
    }




    return {
        handleChangeInput,
        handleChangeEmail,
        handleChangeUpperInput,
        handleChangeSelect,
        handleChangeTextArea,

        clearTextArea,
        clearInput,
        clearEmail,
        clearSelect,

        inputValue,
        emailValue,
        selectValue,
        textArea,
        upperInputValue

    }
}

export default useEdit


















