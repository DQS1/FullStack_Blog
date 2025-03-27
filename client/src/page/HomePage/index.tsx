import Header from '~/components/header';
import BlogList from '~/page/HomePage/components/BlogList';
import CreatePostModel from '~/page/HomePage/components/CreatePostModel';
import { useHomePageReducer } from '~/page/HomePage/reducer';

const HomePage = () => {
  const [state, actions] = useHomePageReducer();
  return (
    <div>
      <Header />
      <BlogList />
      <CreatePostModel state={state} actions={actions} />
    </div>
  );
};

export default HomePage;
