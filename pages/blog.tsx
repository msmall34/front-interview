import styled from 'styled-components';

import Layout from '../components/Layout';

import fetch from 'isomorphic-unfetch';

const PostWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  div {
    max-width: 450px;
  }

  li {
    list-style: none;
    margin-bottom: 60px;
  }

  .dateLabel {
    font-weight : bold;
  }

  img {
    width: 200px
    height: auto;
  }
`;


const Blog = props => (
  <Layout>
    <h1>Blog</h1>
    <ul>
      {props.shows.map(show => (
        <PostWrapper>
          <li key={show.id}>
            <h2>{show.title}</h2>
            <img src={`https://upply-interview.herokuapp.com/images/${show.src}`} />
            <p>{show.text}</p>
            {show.date && (
            <div>
              <span className="dateLabel">Date :</span>
              <span className="datel">{show.date}</span>
            </div>
          )}
          </li>
        </PostWrapper>
      ))}
    </ul>
  </Layout>
);

Blog.getInitialProps = async function() {
  const url = 'http://upply-interview.herokuapp.com/';

  const data = await fetch(url).then(response =>
    response.json().then(data => ({
        data: data,
        status: response.status
    })
  ).then(res => {
      console.log(res)
      return { shows : res.data };
  }));

  return data;


};

export default Blog;
