const FilterButtons = ({ setFilter }) => {
  return (
    <div className="filter-btns-container">
      <button onClick={() => setFilter("all")} className="filter-btn">
        All
      </button>
      <button onClick={() => setFilter("completed")} className="filter-btn">
        Completed
      </button>
      <button onClick={() => setFilter("incomplete")} className="filter-btn">
        Incomplete
      </button>
    </div>
  );
};

export default FilterButtons;
