import Header from '~/components/header';
import BlogList from '~/pages/HomePage/components/BlogList';
import CreatePostModel from '~/pages/HomePage/components/CreatePostModel';
import { HomePageProvider } from '~/pages/HomePage/reducer/HomePageContext';

const HomePage = () => {
  return (
    <HomePageProvider>
      <Header />
      <BlogList />
      <CreatePostModel />
    </HomePageProvider>
  );
};

export default HomePage;
