import styled from 'styled-components';
import * as React from "react";

const Wrapper = styled.header`
  padding: 1rem 0 3rem;
`;

const SearchBox = props => {
    return (
        <Wrapper>
            <input type="text" placeholder="Search" value={props.filterTerm} onChange={props.handleChange} />
        </Wrapper>
    )
};

export default SearchBox;
