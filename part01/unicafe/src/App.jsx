import { useState } from "react";

const totalFunc = (items) => items.reduce((i, j) => i + j, 0);

const Total = ({ good, neutral, bad }) => {
  return <p>all {totalFunc([good, neutral, bad])}</p>;
};

const Average = ({ good, neutral, bad }) => {
  let goodScore = 1;
  let neutralScore = 0;
  let badScore = -1;

  let total = totalFunc([good, neutral, bad]);
  let average = 0;
  if (total !== 0) {
    average =
      (good * goodScore + neutral * neutralScore + bad * badScore) / total;
  }
  return <p>average {average}</p>;
};

const Positive = ({ good, neutral, bad }) => {
  let total = totalFunc([good, neutral, bad]);
  let percentage = 0;
  if (total !== 0) {
    percentage = 100 * (good / total);
  }

  return <p>positive {percentage} %</p>;
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
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Total good={good} neutral={neutral} bad={bad} />
      <Average good={good} neutral={neutral} bad={bad} />
      <Positive good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
