const PropertyItem = ({allFields, property, callback}) => {
  return (
    <>
      <tr>
        {
          allFields &&
          <td>
            <input
              type="checkbox"
              checked={property.isSaved}
              onChange={callback}
            />
          </td>
        }
        <td>{property.address}</td>
        <td>{property.postcode}</td>
        {allFields && <td>{property.propertyType}</td>}
        <td>{property.numberOfRooms}</td>
        <td>{property.floorArea}</td>
      </tr>
    </>
  )
}

export  default PropertyItem
