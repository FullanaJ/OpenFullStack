const Filter = ({ filter }) =>
    <>
        <form>
            <div>
                filter shown with: <input onChange={filter} />
            </div>
        </form>
    </>
export default Filter