import { useState } from "react";
import './Search.scss'

const Search = ({query, callback}) => {
  const [value, setValue] = useState(query)
  const handleChange = event => {
    setValue(event.target.value)
  }
  return (
    <div className="search-container">
      <h4>Search</h4>
      <div className="form-field">
        <input
          type="text"
          name="search"
          value={value}
          onChange={handleChange}
          placeholder="Address"
          autoComplete="off"
        />
        <button onClick={event => callback(event, value)}>Search</button>
      </div>
    </div>
  )
}

export default Search
