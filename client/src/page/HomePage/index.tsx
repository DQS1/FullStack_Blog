import Header from '~/components/header';
import BlogList from '~/page/HomePage/components/BlogList';
import CreatePostModel from '~/page/HomePage/components/CreatePostModel';
import { HomePageProvider } from '~/page/HomePage/reducer/homePageContext';

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
