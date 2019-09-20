import styled from 'styled-components';

import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';

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



const Blog  = ({show})  => (
  <Layout>
    <h1 data-testid="page-title">Blog</h1>
    <p data-testid="text">This boilerplate uses Nextjs, React v16.8 and Styled components</p>
    <h2>{show.title}</h2>
    <p>{show.text}</p>
    <img src={show.src} />
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
      return res;
  }));

  // console.log(`Show data fetched. Count: ${data.length}`);
  //
  // const shows = data.map(entry => {entry.show});
  return data;


};

export default Blog;
