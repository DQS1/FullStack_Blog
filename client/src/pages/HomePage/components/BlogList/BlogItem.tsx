import { Heart, MoreVertical } from 'lucide-react';
import moment from 'moment';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '~/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { blogActions } from '~/features/blog/blogSlice';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import useHomePageContext from '~/pages/HomePage/reducer/HomePageContext';
import { BlogItemProps, ModeModel } from '~/pages/HomePage/types';

const BlogItem = ({ blogData }: { blogData: BlogItemProps }) => {
  const dispatch = useAppDispatch();
  const { actions } = useHomePageContext();

  // const { isModelOpen, modeModel } = state;

  const formatDate = (date: string) =>
    moment(date).format('HH:mm - DD/MM/YYYY');

  const handleUpdateBlog = () => {
    actions.onOpenModel(true);
    actions.onChangeModeModel(ModeModel.EDIT);
    actions.onSelectBlogUpdate(blogData);
  };

  const handleDeleteBlog = async (id: string) => {
    const payload = {
      id,
      onSuccess: () => {
        dispatch(blogActions.getAllBlog());
      }
    };
    dispatch(blogActions.deleteBlog(payload));
  };

  return (
    <Card className='blog-item shadow-md' data-blog={blogData._id}>
      <CardHeader className='flex-row items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Avatar>
            <AvatarImage src={'https://github.com/shadcn.png'} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className='font-semibold'>{blogData.author}</h3>
            <p className='text-sm text-gray-400'>
              {formatDate(blogData.createdAt)}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'ghost'}
              size={'icon'}
              className='cursor-pointer hover:rounded-full'
            >
              <MoreVertical className='cursor-pointer text-gray-400' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='bottom'>
            <DropdownMenuItem
              className='btn-delete cursor-pointer'
              onClick={() => handleDeleteBlog(blogData._id)}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              className='btn-update cursor-pointer'
              onClick={handleUpdateBlog}
            >
              Update
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        {blogData.attachment && (
          <img
            src={`http://localhost:5000${blogData?.attachment}`}
            alt='Blog image'
            className='h-[200px] w-full object-cover'
          />
        )}

        <h4 className='mt-2 scroll-m-20 text-xl font-semibold tracking-tight'>
          {blogData?.title}
        </h4>
        <p className='mt-2 text-sm text-gray-500'>{blogData?.content}</p>
      </CardContent>

      <CardFooter className=''>
        <Button className='cursor-pointer' variant={'ghost'}>
          <Heart />
        </Button>
        <h6 className='scroll-m-20 justify-center font-light tracking-tight'>
          {`${blogData?.likeCount} likes`}
        </h6>
      </CardFooter>
    </Card>
  );
};

export default BlogItem;
