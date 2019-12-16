import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { useLastLocation } from 'react-router-last-location';
import { Link, useHistory } from 'react-router-dom';
import '../../App.css';
import './BackFromMainMenu.css';

const BackFromMainMenu = (props) =>
{
  const history = useHistory();
  console.log("history : ", history);

  return (
    <div className="back-from-main-menu" style={props.style} onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faMinus} />
    </div>
  );
}

export default BackFromMainMenu;
