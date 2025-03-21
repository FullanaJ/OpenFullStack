const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    console.log(message);
    
    if (message.error) {
        const added = {
            color: 'red',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
        }
    } else {
        const added = {
            color: 'green',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
        }
    }
    return (
        <div style={added}>
            {message.text}
        </div>
    )
}

export default Notification