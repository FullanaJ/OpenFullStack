const BasicForm = ({ text, callBackOnWrite}) => {
    const x = text + ' '
    return (
        <form>
            <p>
                {x}
                <input onChange={callBackOnWrite}/>
            </p>
        </form>
    )
}

export default BasicForm