import styled from 'styled-components';
import * as React from "react";

const SelectWrapper = styled.div`
  display: flex;
  height: 40px;
  align-items: baseline;
  width: 17%;
  justify-content: space-between;
`;

const SortFilters = props => {
    return (
        <SelectWrapper>
            <p>Filter: </p>
            <select name="sort" id="sort" value={props.sortFilterTerm} onChange={props.handleSortChange}>
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
            </select>
        </SelectWrapper>
    )
};

export default SortFilters;
