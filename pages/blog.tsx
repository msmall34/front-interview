import styled from 'styled-components';

import Layout from '../components/Layout';

const ImageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  div {
    max-width: 450px;
  }

  img {
    padding: 0 5px;
    height: 150px;
  }
`;


const Blog = props => (
  <Layout>
    <h1>Blog</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <h2>{show.title}</h2>
          <p>{show.text}</p>
          <img src={`https://upply-interview.herokuapp.com/images/${show.src}`} />
        </li>
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
