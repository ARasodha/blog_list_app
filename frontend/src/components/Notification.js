const Notification = ({ message }) => {
  if (message[1] === 'error') {
    return (
      <div>
      <h1>{message[0]}</h1>
    </div>
    )
  }

  return (
    <div>
      <h1>{message[0]}</h1>
    </div>
  )
}

export default Notification