import Header from '~/components/header';
import BlogList from '~/page/HomePage/components/BlogList';
import CreatePostModel from '~/page/HomePage/components/CreatePostModel';

const HomePage = () => {
  return (
    <div>
      <Header />
      <BlogList />

      <CreatePostModel />
    </div>
  );
};

export default HomePage;
