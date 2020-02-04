import styled from 'styled-components';

const Wrapper = styled.header`
  padding: 1rem 0 3rem;
`;

const SearchBox = props => {
    return (
        <Wrapper>
            <input type="text" placeholder="Search" value={props.searchTerm} onChange={props.handleChange} />
        </Wrapper>
    )
};

export default SearchBox;
