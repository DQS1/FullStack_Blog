import BlogItem from '~/page/HomePage/components/BlogList/BlogItem';
import { RootState } from '~/redux/store';
import { useAppSelector } from '~/hooks/useAppSelector';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useEffect } from 'react';
import { blogActions } from '~/features/blog/blogSlice';

interface BlogItemProps {
  _id: string;
  author: string;
  createdAt: string;
  attachment: string;
  title: string;
  content: string;
  likeCount: number;
}

const BlogList = () => {
  const dispatch = useAppDispatch();
  const Blogs = useAppSelector(
    (state: RootState) => state.blog.getAllBlogResponse
  );
  console.log('🚀 ~ BlogList ~ Blogs:', Blogs);

  useEffect(() => {
    dispatch(blogActions.getAllBlog());
  }, []);

  if (!Blogs || Blogs.length === 0) {
    return <p>Không có bài viết nào.</p>;
  }

  return (
    <div className='my-2 grid grid-flow-row grid-cols-2 gap-4'>
      {Blogs.map((blog: BlogItemProps, index: number) => (
        <BlogItem key={blog?._id || index} blogData={blog} />
      ))}
    </div>
  );
};

export default BlogList;
