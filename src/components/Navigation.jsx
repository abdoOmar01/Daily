import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faHouse, faStar, faTrashAlt, faCheckCircle } from "@fortawesome/free-solid-svg-icons"

import "./Navigation.css"

const Navigation = ({
  searchVal,
  searchHandler,
  navHandler,
  image,
  showHandler,
  modeHandler,
  logoutHandler
 }) => {
  return (
    <div className="nav-container">
      <div className="ham-menu">
        <FontAwesomeIcon className="ham-icon" onClick={navHandler} icon={faBars}
          size="lg" />
      </div>
      <img onClick={modeHandler} src={image} alt="Daily App logo" className="logo" />
      <input autoComplete="off" type="text" name="search" id="search-input"
        placeholder="Search" value={searchVal}
        onChange={searchHandler} />
      <div className="options">
        <div onClick={() => showHandler('all')} className="option all">
          <FontAwesomeIcon className="op-icon" icon={faHouse} size="xl" />
          <p>All Tasks</p>
        </div>

        <div onClick={() => showHandler('important')} className="option important">
          <FontAwesomeIcon className="op-icon" icon={faStar} size="xl" />
          <p>Important</p>
        </div>

        <div onClick={() => showHandler('done')} className="option done">
          <FontAwesomeIcon className="op-icon check-icon" icon={faCheckCircle} size="xl" />
          <p>Done</p>
        </div>

        <div onClick={() => showHandler('deleted')} className="option trash">
          <FontAwesomeIcon className="op-icon trash-icon" icon={faTrashAlt} size="xl" />
          <p>Deleted</p>
        </div>
      </div>

      <div id="log-out">
        <button onClick={logoutHandler}>Log out</button>
      </div>
    </div>
  )
}

export default Navigation