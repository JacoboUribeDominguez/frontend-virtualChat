import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import Context from '../../context/Context';
import ClipLoader from "react-spinners/ClipLoader";

const Information = () => {

    const {
        informationLoading,
        information,
        optionSelected,
        setInformation
    } = useContext(Context);

    const [textAreaInformation, setTextAreaInformation] = useState('');
    const [modifing, setModifing] = useState(false);

    const modifyInformation = async() => {
        if (information.id_information) {
            const res = await fetch(`${process.env.REACT_APP_API}information/putInformation`, {
                method: 'POST',
                body: JSON.stringify({
                    id_information: information.id_information,
                    description: textAreaInformation
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json();
            setInformation({
                ...information,
                description : data.data.description
            })
        } else {
            const res = await fetch(`${process.env.REACT_APP_API}information/addInformation`, {
                method: 'POST',
                body: JSON.stringify({
                    id_option_support: optionSelected,
                    description: textAreaInformation
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json();
            setInformation({
                id_information: data.data.id_information,
                description: data.data.description
            })
        }
        setModifing(false);
    }

    useEffect(() => {
        setTextAreaInformation(information.description)
    }, [information])

    return (
        <div className="information-container">
            <h3>
                Information of element selected <FontAwesomeIcon style={{ color: 'rgb(236, 207, 19)' }} icon={faPen} onClick={() => setModifing(true)} />
            </h3>
            <div className="information">
                {
                    modifing && <FontAwesomeIcon className="saveIcon" icon={faFloppyDisk} onClick={modifyInformation} />
                }
                {
                    informationLoading ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ClipLoader color="white" loading={informationLoading} size={50} />
                        </div>
                    ) : (
                        <>
                            {!modifing ? information.description : (
                                <textarea 
                                    type="text" 
                                    rows={8} 
                                    className="text-area-information" 
                                    onChange={(e) => setTextAreaInformation(e.target.value)} 
                                    value={textAreaInformation}
                                />
                            )}
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Information