const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    //console.log('message content', message);

    const added = {
        color: message.error ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
        <div style={added}>
            {message.text}
        </div>
    )
}

export default Notification