import styled from 'styled-components';

import Layout from '../components/Layout';

import fetch from 'isomorphic-unfetch';

import Link from 'next/link'


const LinkWrapper = styled.li`
list-style: none;

div {
  width: 200px;
  margin-top: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

`;

const Blog = props => (
  <Layout>
    <h1>Blog</h1>
    <ul>
      {props.shows.map(show => {
        return (
          <LinkWrapper key={show.id}>
            <Post
            title={show.title}
            src={show.src}
            text={show.text}
            date={show.date}
             />
          </LinkWrapper>
        )
      })}
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

function Post (props) {
  return (

      <div>

        <Link href={`/post?title=${props.title}&src=${props.src}&text=${props.text}&date=${props.date}`}>

            <a>{props.title}</a>

        </Link>

      </div>

  )
}


export default Blog;
