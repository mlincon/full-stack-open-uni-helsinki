import { useState } from "react";

const randomSelected = (max) => Math.floor(Math.random() * max);

const getMaxVotes = (votes) => {
  const maxKey = Object.entries(votes).reduce(
    (acc, [key, value]) => {
      return value > acc.value ? { key, value } : acc;
    },
    { key: 0, value: 0 }
  );
  return maxKey["key"];
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const points = anecdotes.reduce((acc, item, index) => {
    acc[index] = 0;
    return acc;
  }, {});

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points);
  const [maxVotes, setMaxVotes] = useState(0);

  const handlerNextClick = () => setSelected(randomSelected(anecdotes.length));
  const handlerVoteClick = () => {
    const copy = { ...votes };
    copy[selected] += 1;
    setVotes(copy);

    const mostVote = getMaxVotes(copy);
    setMaxVotes(mostVote);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handlerVoteClick}>vote</button>
      <button onClick={handlerNextClick}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVotes]}</p>
    </div>
  );
};

export default App;
