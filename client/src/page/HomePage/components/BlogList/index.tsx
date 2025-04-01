import { useEffect } from 'react';
import Loading from '~/components/loading';
import { blogActions } from '~/features/blog/blogSlice';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useAppSelector } from '~/hooks/useAppSelector';
import BlogItem from '~/page/HomePage/components/BlogList/BlogItem';
import { actionsCreatorProps, homePageStates } from '~/page/HomePage/types';
import { RootState } from '~/redux/store';

interface BlogItemProps {
  _id: string;
  author: string;
  createdAt: string;
  attachment: string;
  title: string;
  content: string;
  likeCount: number;
}

interface BlogListType {
  state?: homePageStates;
  actions?: actionsCreatorProps;
}

const BlogList = () => {
  const dispatch = useAppDispatch();

  const { getAllBlogLoading: blogLoading, getAllBlogResponse: blogs } =
    useAppSelector((state: RootState) => state.blog);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    console.log('🚀 ~ handleClick ~ target:', target);
    const blogId = target.closest('.blog-item')?.getAttribute('data-blog');
    console.log('🚀 ~ handleClick ~ blogId:', blogId);
  };

  useEffect(() => {
    dispatch(blogActions.getAllBlog());
  }, []);

  if (blogLoading) return <Loading />;

  return blogs?.length ? (
    <div
      className='mx-[15%] my-2 grid grid-flow-row grid-cols-1 gap-4 md:mx-[5%] md:grid-cols-2'
      onClick={handleClick}
    >
      {blogs.map((blog: BlogItemProps, index: number) => (
        <BlogItem key={blog?._id || index} blogData={blog} />
      ))}
    </div>
  ) : (
    <p className='text-center text-lg text-gray-500'>Không có bài viết nào.</p>
  );
};

export default BlogList;
