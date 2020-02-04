import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { useHistory, Link } from 'react-router-dom';
import '../../App.css';
import './BackFromMainMenu.css';

const BackFromMainMenu = props =>
{
  const history = useHistory();
  console.log("history : ", history);

  return (
    props.backRoute ?
    <Link to={props.backRoute}>
      <div className="back-from-main-menu" style={props.style} >
        <FontAwesomeIcon icon={faMinus} />
      </div>
    </Link> :
    <div className="back-from-main-menu" style={props.style} onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faMinus} />
    </div>
  );
}

export default BackFromMainMenu;
