import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import Layout from '../components/Layout';

import fetch from 'isomorphic-unfetch';

import SearchBox from '../components/SearchBox'

import moment from 'moment';

const Blog = props => {
    const [searchTerm, setSearchTerm] = useState();
    const [filteredPosts, filterPosts] = useState([]);

    useEffect(() => {
        const orderedByDatePosts = props[0].sort((a, b) => a.id - b.id);
        const results = searchTerm ? orderedByDatePosts.filter(result =>result.title.includes(searchTerm)) : orderedByDatePosts;
        filterPosts(results);
    }, [searchTerm]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    return (
        <Layout>
            <h1>Blog</h1>
            <SearchBox searchTerm={searchTerm} handleChange={handleChange} />
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
        return [res.data];
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
