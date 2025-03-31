const Person = ({ idRef, name, number, handleDelete }) => {
    return <p>{name} {number} <button onClick={() => handleDelete(idRef,name)}>Delete</button></p>
}
const Content = ({ persons, onDelete }) =>
    <>
        {console.log('persons on content:',persons)}
        {persons.map((p) => <Person key={p.id} idRef={p.id} name={p.name} number={p.number} handleDelete={onDelete} />)}
    </>

export default Content
