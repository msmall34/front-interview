import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import Layout from '../components/Layout';

import fetch from 'isomorphic-unfetch';

import SearchBox from '../components/SearchBox';

import SortFilter from '../components/SortFilters';

import moment from 'moment';
import {object} from "prop-types";

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Blog = ({ data }) => {
    const [searchFilterTerm, setSearchFilterTerm] = useState();
    const [sortFilterTerm, setSortFilterTerm] = useState('asc');
    let [filteredPosts, filter] = useState([]);
    let results = [];

    useEffect(() => {
        if(searchFilterTerm) {
            results = data.filter(orderedPost =>orderedPost.title.toLowerCase().includes(searchFilterTerm));
        }else if(sortFilterTerm === 'asc' ) {
            results = Object.create(data.sort((a, b) => (a.id > b.id) ? 1 : -1));
        } else {
            results = Object.create(data.sort((a, b) => (a.id > b.id) ? -1 : 1));
        }
        filter(results);
    }, [searchFilterTerm, sortFilterTerm]);


    const handleChange = event => {
        setSearchFilterTerm(event.target.value.toLowerCase());
    };

    const handleSortChange = event => {
        setSortFilterTerm(event.target.value);
    };

    return (
        <Layout>
            <h1>Blog</h1>
            <FilterWrapper>
                <SearchBox searchFilterTerm={searchFilterTerm} handleChange={handleChange} />
                <SortFilter sortFilterTerm={sortFilterTerm} handleSortChange={handleSortChange}/>
            </FilterWrapper>
            <ul>
                {filteredPosts.map(filteredPost => {
                    return (
                        <li key={filteredPost.id}>
                            <Post
                                title={filteredPost.title}
                                src={filteredPost.src}
                                text={filteredPost.text}
                                date={filteredPost.date}
                            />
                        </li>
                    )
                })}
            </ul>
        </Layout>
    )
};

Blog.getInitialProps = async function() {
  const url = 'http://upply-interview.herokuapp.com/';
  const data = await fetch(url).then(response =>
    response.json().then(data => ({
        data: data,
        status: response.status
    })
  ).then(res => {
        return  {data: res.data};
  }));

  return data;
};

function Post (props) {
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.text}</p>
            <img src={`https://upply-interview.herokuapp.com/images/${props.src}`} />
            <p>{props.date ? 'date : ' + moment(props.date).format('YYYY MM DD') : ''}</p>
        </div>
    )
}

export default Blog;
