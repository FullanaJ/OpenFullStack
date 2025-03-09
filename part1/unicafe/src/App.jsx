import { use, useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const StatisticLine = ({ text, value }) =>
  <tr>
    <td>
      {text}
    </td>
    <td>
      {value}
    </td>
  </tr>
const Statics = ({ good, neutral, bad, all }) => {

  if (all == 0) return (
    <p>
      No feedback given
    </p>
  )

  const average = () => {
    //(buena: 1, neutral: 0, mala: -1)
    // if (all === 0) return 0
    const x = good - bad
    return x / all
  }
  const averagePositives = () => {
    // if (all === 0) return 0
    return good * 100 / all
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average()} />
        <StatisticLine text="positive" value={averagePositives() + " %"} />
      </tbody>
    </table>
  )
}
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    const newValue = good + 1
    const allClicks = all + 1
    setAll(allClicks)
    setGood(newValue)
  }
  const handleNeutralClick = () => {
    const newValue = neutral + 1
    const allClicks = all + 1
    setAll(allClicks)
    setNeutral(newValue)
  }
  const handleBadClick = () => {
    const newValue = bad + 1
    const allClicks = all + 1
    setAll(allClicks)
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statics</h1>
      <Statics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all} />
    </div>
  )
}

export default App