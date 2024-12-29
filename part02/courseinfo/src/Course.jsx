const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Parts = ({ parts }) => {
  return parts.map((part) => {
    return (
      <p key={part.id}>
        {part.name}: {part.exercises}
      </p>
    );
  });
};

const Total = ({ parts }) => {
  let exercises = parts.map((part) => part.exercises);
  return (
    <p>
      <b>total of {exercises.reduce((i, j) => i + j, 0)} exercises</b>
    </p>
  );
};

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header name={course.name} />
            <Parts parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        );
      })}
    </>
  );
};

export default Course;
