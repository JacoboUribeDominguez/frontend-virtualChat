import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTurnDown } from '@fortawesome/free-solid-svg-icons'
import Context from '../../context/Context'

const OptionsSupport = () => {

  const {
    optionSelected,
    setOptionSelected
  } = useContext(Context);

  const [optionsSupport, setOptionsSupport] = useState([]);

  const [newOptionSelected, setNewOptionSelected] = useState('');

  const getOptionsSupport = useCallback(async () => {
    //there will be a fetch
    const res = await fetch('http://localhost:3001/options-support/getOptions', {
      method: 'POST',
      body: JSON.stringify({
        admin: localStorage.getItem('id_user'),
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    if(data.data && data.data.length > 0){
      setOptionsSupport(data.data)
      setOptionSelected(data.data[0].id_option_support)
    }
  }, [setOptionSelected])

  const onClickOptionSupport = (id) => {
    if (id !== optionSelected) {
      setOptionSelected(id)
      setOptionSelected(id);
    }
  }

  const addOptionSelected = async() => {
    if (newOptionSelected.length > 0) {
      const res = await fetch('http://localhost:3001/options-support/addOption', {
        method: 'POST',
        body: JSON.stringify({
          name: newOptionSelected,
          id_user: localStorage.getItem('id_user'),
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json();
      if(data.data && data.data !== null){
        setOptionsSupport([...optionsSupport, data.data])
      }
      setNewOptionSelected('');
    }
  }

  useEffect(() => {
    getOptionsSupport()
  }, [getOptionsSupport])

  return (
    <div className="options-support">
      <h3
        className="options-support-title"
      >
        Elements to support users
        <FontAwesomeIcon icon={faTurnDown} />
      </h3>
      {
        optionsSupport.length > 0
        &&
        optionsSupport.map((option) => (
          <div
            key={option.id_option_support}
            className={`option-support ${(option.id_option_support === optionSelected) && 'selected'}`}
            onClick={() => onClickOptionSupport(option.id_option_support)}
          >
            {option.name}
          </div>
        ))
      }
      <div className="option-support-add">
        <input
          placeholder="Add element"
          value={newOptionSelected}
          onChange={(e) => setNewOptionSelected(e.target.value)}
        />
        <FontAwesomeIcon icon={faPlus} onClick={addOptionSelected} />
      </div>
    </div>
  )
}

export default OptionsSupport