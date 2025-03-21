const PersonForm = ({ onNameChange, onNumberChange, onSubmit }) =>
    <>
        <form onSubmit={onSubmit}>
            <div>
                name: <input onChange={onNameChange} />
            </div>
            <div>
                number: <input onChange={onNumberChange} />
            </div>
            <div></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </>

export default PersonForm