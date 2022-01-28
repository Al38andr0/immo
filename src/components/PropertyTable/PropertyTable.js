import PropertyItem from "../PropertyItem/PropertyItem";
import './PropertyTable.scss'

const PropertyTable = ({title, collection, allFields, callback}) => {
  return (
    <>
      <h4>{title}</h4>
      <table className="properties-table">
        <thead>
        <tr>
          {allFields && <th>✓</th>}
          <th>Address</th>
          <th>Postcode</th>
          {allFields && <th>Property type</th>}
          <th>Number of rooms</th>
          <th>Floor area (m<sup>2</sup>)</th>
        </tr>
        </thead>
        <tbody>
          {
            collection.map(property =>
              <PropertyItem
                key={property.id}
                allFields={allFields}
                property={property}
                callback={event => callback(event, property)}
              />)}
        </tbody>
      </table>
    </>
  )
}

export default PropertyTable
