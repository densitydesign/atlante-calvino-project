import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import './CloseCompass.css';

const CloseCompass = (props) =>
{
  const history = useHistory();
  console.log("history : ", history);

  return (
    <div className="back-from-main-menu" style={props.style} onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faTimes} />
    </div>
  );
}

export default CloseCompass;
