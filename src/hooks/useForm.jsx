import {useState} from 'react'

function useForm() {
  const [inputValue, setInputValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [textArea, setTextArea] = useState('');
  const [upperInputValue, setUpperInputValue] = useState('');

  //console.log(inputValue);


  // Maneja el cambio de valor del input y actualiza el estado

  const handleChangeInput = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    //.toUpperCase()
  };
  const handleChangeUpperInput = (event) => {
    event.preventDefault();
    setUpperInputValue(event.target.value.toUpperCase());
  };

  //Lleva el valor del input a un string vacio
  const clearInput = () => {
    setInputValue("");
  }

  // Maneja el cambio de valor del input y actualiza el estado
  const handleChangeEmail = (event) => {
    event.preventDefault();
    setEmailValue(event.target.value);
    //.toLowerCase()
  };

  //Lleva el valor del input a un string vacio
  const clearEmail = () => {
    setEmailValue("");
  }

  //Maneja el valor de los selects y actualiza el estado
  const handleChangeSelect = (event) => {
    event.preventDefault();
    setSelectValue(event.target.value);
  };
  // Lleva el valor del select a un string vacio
  const clearSelect = (text) => {
    setSelectValue(text);
  }

  // Maneja el cambio de valor del textarea y actualiza el estado
  const handleChangeTextArea = (event) => {
    event.preventDefault();
    setTextArea(event.target.value);
    //.toUpperCase()
  }
  // Lleva el valor del textarea a un string vacio
  const clearTextArea = () => {
    setTextArea("");
  }

  // Codigo para desahbilitar la opcion cartel de la lista desplegable para usar como placeholder
  const placeholderForSelect = (id,)=>{
    const select = document.getElementById(id);
    select.disabled = true;
  }



  return {
    inputValue,
    selectValue,
    handleChangeEmail,
    emailValue,
    textArea,
    handleChangeInput,
    handleChangeSelect,
    handleChangeTextArea,
    clearInput,
    clearSelect,
    clearTextArea,
    clearEmail,
    placeholderForSelect,

    upperInputValue, 
    handleChangeUpperInput
  };
}

export default useForm;