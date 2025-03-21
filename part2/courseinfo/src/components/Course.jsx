const Total = ({ exercises }) =>
    <p>
        <strong>
            total of {exercises.reduce((sum, exercise) => sum += exercise, 0)} exercises
        </strong>
    </p>
const Content = ({ parts }) =>
    <>
        {parts.map(
            (part) =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
        <Total exercises={parts.map((p) => p.exercises)} />
    </>

const Part = ({ name, exercises }) =>
    <p >
        {name} {exercises}
    </p>


const Header = ({ headText }) => <h2>{headText}</h2>

const Course = ({ course }) =>
    <>
        <Header headText={course.name} />
        <Content parts={course.parts} />
    </>

export default Course  