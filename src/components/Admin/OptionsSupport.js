import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTurnDown } from '@fortawesome/free-solid-svg-icons'
import Context from '../../context/Context'

const OptionsSupport = () => {

  const {
    optionSelected,
    setOptionSelected,
    setInformationLoading,
    setInformation,
    setSeveritySelected
  } = useContext(Context);

  const [optionsSupport, setOptionsSupport] = useState([]);

  const [newOptionSelected, setNewOptionSelected] = useState('');

  const getOptionsSupport = useCallback(async () => {
    //there will be a fetch
    const res = await fetch(`${process.env.REACT_APP_API}options-support/getOptions`, {
      method: 'POST',
      body: JSON.stringify({
        admin: localStorage.getItem('id_user'),
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    console.log(data.data)
    if(data.data && data.data.length > 0){
      setOptionsSupport(data.data)
      console.log(data.data)
      setSeveritySelected(data.data[0].id_severity)
      setOptionSelected(data.data[0].id_option_support)
      const res2 = await fetch(`${process.env.REACT_APP_API}information/getInformationByOption`, {
        method: 'POST',
        body: JSON.stringify({
          id_option_support: data.data[0].id_option_support,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data2 = await res2.json();
      if(data2.data){
        if(data2.data.length === 0){
          setInformation({ description: 'No information for this option'})
        } else {
          setInformation(data2.data[0])
        }
        setInformationLoading(false);
      }
    }
  }, [setOptionSelected, setInformation, setInformationLoading])

  const onClickOptionSupport = async(option) => {
    if (option.id_option_support !== optionSelected) {
      setSeveritySelected(option.id_severity)
      setOptionSelected(option.id_option_support);
      setInformationLoading(true);
      const res2 = await fetch(`${process.env.REACT_APP_API}information/getInformationByOption`, {
        method: 'POST',
        body: JSON.stringify({
          id_option_support: option.id_option_support,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data2 = await res2.json();
      if(data2.data){
        if(data2.data.length === 0){
          setInformation({ description: 'No information for this option'})
        } else {
          setInformation(data2.data[0])
        }
        setInformationLoading(false);
      }
    }
  }

  const addOptionSelected = async() => {
    if (newOptionSelected.length > 0) {
      const res = await fetch(`${process.env.REACT_APP_API}options-support/addOption`, {
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
            onClick={() => onClickOptionSupport(option)}
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