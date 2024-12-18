import { useState } from "react";

const totalFunc = (items) => items.reduce((i, j) => i + j, 0);

const Button = (props) => {
  const { text, handler } = props;
  return <button onClick={handler}>{text}</button>;
};

const StatisticLine = (props) => {
  const { text, value } = props;
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  let goodScore = 1;
  let neutralScore = 0;
  let badScore = -1;

  let total = totalFunc([good, neutral, bad]);
  if (total === 0) {
    return <p>No feedbacks given</p>;
  }

  let average =
    (good * goodScore + neutral * neutralScore + bad * badScore) / total;
  let percentage = String(100 * (good / total)) + "%";

  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={percentage} />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handler={handleGoodClick} />
      <Button text="neutral" handler={handleNeutralClick} />
      <Button text="bad" handler={handleBadClick} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
