import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags, setFavPosts, setNoFavPosts } from '../redux/slices/posts';

export const Home = () => {
  const [value, setValue] = React.useState('1');

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);

  // const [] =

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  // const favorPosts = () => {
  // console.log({posts});

  //  return posts.items.sort((a,b) => a.viewsCount - b.viewsCount)
  // }
  // console.log(favorPosts());

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // React.useEffect(() => {
  //   axios.get('/sort-posts').then((res) => console.log(res.data))
  // }, []);

  // const navigateSort = () => {
  //   navigate('/sort-post')
  // }

  return (
    <>
      {/* <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые"  />
        <Tab onClick={() => dispatch(setFavPosts())} label="Популярные" />
      </Tabs> */}
        <Tabs value={value} style={{ marginBottom: 15 }} onChange={handleChange} aria-label="basic tabs example">
          
          <Tab onClick={() => dispatch(fetchPosts())} value="1" label="Новые" />
          <Tab onClick={() => dispatch(setFavPosts())} value="2" label="Популярные" />
          <Tab onClick={() => dispatch(setNoFavPosts())} value="3" label="Менее популярные" />
        </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
