const Filter = ({setSearchText}) => {
  const handlePersonSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      filter shown with <input onChange={handlePersonSearch} />
    </div>
  );
};

export default Filter;
