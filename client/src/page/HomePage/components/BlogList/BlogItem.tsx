import { Heart, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '~/components/ui/card';
import moment from 'moment';
import { Button } from '~/components/ui/button';

const BlogItem = () => {
  const Blog = {
    _id: {
      $oid: '67cc1ef3fe0de2604a462324'
    },
    title: 'Hành trình khám phá Nhật Bản',
    content:
      'Nhật Bản là một đất nước xinh đẹp với nền văn hóa phong phú, ẩm thực đặc sắc và con người thân thiện.',
    author: 'Nguyễn Văn A',
    attachment:
      'https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds',
    likeCount: 120,
    createdAt: '2025-03-08T10:00:00Z',
    updatedAt: '2025-03-08T10:00:00Z'
  };

  const formatData = (day: string) => {
    return `${moment(day).format('HH:mm MM DD YYYY')}`;
  };

  return (
    <Card className=''>
      <CardHeader className='flex-row items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Avatar>
            <AvatarImage src={'https://github.com/shadcn.png'} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className='font-semibold'>{Blog.author}</h3>
            <p className='text-sm text-gray-400'>
              {formatData(Blog.createdAt)}
            </p>
          </div>
        </div>
        <MoreVertical className='cursor-pointer text-gray-400' />
      </CardHeader>

      <CardContent>
        <img
          src={`${Blog.attachment}`}
          alt='Paella'
          className='h-[200px] w-full object-cover'
        />
        <h4 className='mt-2 scroll-m-20 text-xl font-semibold tracking-tight'>
          {Blog?.title}
        </h4>
        <p className='mt-2 text-sm text-gray-500'>{Blog?.content}</p>
      </CardContent>

      <CardFooter className=''>
        <Button variant={'ghost'}>
          <Heart />
        </Button>
        <h6 className='scroll-m-20 justify-center font-light tracking-tight'>
          {`${Blog?.likeCount} likes`}
        </h6>
      </CardFooter>
    </Card>
  );
};

export default BlogItem;
