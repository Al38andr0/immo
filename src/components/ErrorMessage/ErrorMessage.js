import PropTypes from 'prop-types'
import './ErrorMessage.scss'

const ErrorMessage = ({ message }) => (
  <h4 className="error-message">{message}</h4>
)

ErrorMessage.propTypes = {
  message: PropTypes.string
}
ErrorMessage.defaultProps = {
  message: "There has been a problem with your search. Please try again!"
}
export default ErrorMessage
