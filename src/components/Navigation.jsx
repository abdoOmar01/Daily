import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const Navigation = ({ searchVal, searchHandler, navHandler, image }) => {
  return (
    <div className="nav-container">
      <div className="ham-menu">
        <FontAwesomeIcon className="ham-icon" onClick={navHandler} icon={faBars}
          size="lg" />
      </div>
      <img src={image} alt="Daily App logo" className="logo" />
      <input autoComplete="off" type="text" name="search" id="search-input"
        placeholder="Search" value={searchVal}
        onChange={searchHandler} />
    </div>
  )
}

export default Navigation