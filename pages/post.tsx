import { withRouter } from 'next/router'
import styled from 'styled-components';
import Layout from '../components/Layout';

const PostWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    max-width: 450px;
  }

  .dateLabel {
    font-weight : bold;
  }

  img {
    width: 200px
    height: auto;
  }
`;

const Post = withRouter((props) => {
  console.log('props', props);
  return (
    <div>
      <Layout>
        <PostWrapper>
          <h2>{props.router.query.title}</h2>
          <img src={`https://upply-interview.herokuapp.com/images/${props.router.query.src}`} />
          <p>{props.router.query.text}</p>
          {props.router.query.date && (
            <div>
              <span className="dateLabel">Date :</span>
              <span className="datel">{props.router.query.date}</span>
            </div>
          )}
        </PostWrapper>
      </Layout>
    </div>
  )
})

export default Post;
