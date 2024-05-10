import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
        style={{ margin: 0 }} // Remove default margin
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          style={{ borderRadius: "20px", padding: "8px" }} // Adjust padding and border-radius
        />
        <button
          className="btn btn-outline-success"
          type="submit"
          style={{
            color: "#FFFFFF",
            borderColor: "#0d0630",
            borderRadius: "20px", // Round the button
            padding: "8px 20px", // Adjust padding
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
