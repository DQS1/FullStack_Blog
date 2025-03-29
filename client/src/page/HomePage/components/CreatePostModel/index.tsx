/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogDescription } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import FloatingActionButton from '~/components/fab';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { blogActions } from '~/features/blog/blogSlice';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { actionsCreatorProps, homePageStates } from '~/page/HomePage/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface CreatePostModelType {
  state: homePageStates;
  actions: actionsCreatorProps;
}

interface uploadDataType {
  title: string;
  content: string;
  attachment: File;
}

export default function CreatePostModel({
  state,
  actions
}: CreatePostModelType) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { isPostModelOpen } = state;

  const dispatch = useAppDispatch();

  const formSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    attachment: z
      .instanceof(File)
      .refine((file) => file instanceof File, 'Attachment must be a valid file')
      .optional()
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      content: '',
      attachment: undefined
    }
  });
  const onSubmit = (data: uploadDataType) => {
    console.log('Form Data:', {
      ...data,
      attachment: data?.attachment ? data?.attachment : 'No file uploaded'
    });

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);

    if (data.attachment) {
      formData.append('attachment', data.attachment);
    }
    console.log('🚀 ~ Form Data:', Object.fromEntries(formData.entries()));
    dispatch(blogActions.createBlog(data));
    actions.onPost(false);
    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    dispatch(blogActions.getAllBlog());
  };

  return (
    <Dialog
      open={isPostModelOpen}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          actions.onPost(true);
        } else {
          actions.onPost(false);
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <FloatingActionButton icon={<Plus />} />
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-[525px]'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className='text-center'>Create New Post</DialogTitle>
        </DialogHeader>
        <DialogDescription aria-describedby={undefined} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit((data: any) => onSubmit(data))}>
            <div className='flex flex-col gap-8 py-4'>
              <div className='flex flex-col items-start gap-4'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem className='relative w-full'>
                      <Label htmlFor='title' className='text-right'>
                        Title
                      </Label>
                      <FormControl>
                        <Input id='title' className='col-span-3' {...field} />
                      </FormControl>
                      <FormMessage className='absolute bottom-[-22px]' />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem className='relative w-full'>
                    <FormControl>
                      <Textarea className='min-h-32' {...field} />
                    </FormControl>
                    <FormMessage className='absolute bottom-[-24px]' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='attachment'
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { onChange, ref, value, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type='file'
                        accept='image/*'
                        ref={fileInputRef}
                        multiple={false}
                        onChange={(e) => {
                          const file = e.target.files?.[0]; // Lấy file đầu tiên (hoặc undefined)
                          if (file) {
                            form.setValue('attachment', file);
                          }
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='absolute bottom-[-22px]' />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button className='w-full cursor-pointer' type='submit'>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
