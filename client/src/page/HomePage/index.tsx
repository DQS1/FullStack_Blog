import { Plus } from 'lucide-react';
import FloatingActionBUtton from '~/components/fab';
import Header from '~/components/header';
import BlogList from '~/page/HomePage/components/BlogList';

const HomePage = () => {
  return (
    <div>
      <Header />
      <BlogList />
      <FloatingActionBUtton icon={<Plus />} />
    </div>
  );
};

export default HomePage;
