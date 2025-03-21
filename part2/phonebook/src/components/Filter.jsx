const Filter = ({ filter }) =>
    <>
        <form>
            <div>
                filter show n with: <input onChange={filter} />
            </div>
        </form>
    </>
export default Filter