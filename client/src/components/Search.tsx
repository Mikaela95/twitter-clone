import React from "react";
import Sticky from "react-sticky-el";

export const Search = () => {
  return (
    <Sticky>
      <div>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search Twitter"
            aria-label="Search"
          />
        </form>
      </div>
    </Sticky>
  );
};
