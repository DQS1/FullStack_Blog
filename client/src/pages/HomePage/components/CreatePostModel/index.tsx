/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Loader2, Plus } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { useAppSelector } from '~/hooks/useAppSelector';
import useHomePageContext from '~/pages/HomePage/reducer/HomePageContext';
import { ModeModel } from '~/pages/HomePage/types';
import { RootState } from '~/redux/store';

interface uploadDataType {
  title: string;
  content: string;
  attachment: File;
}

export default function CreatePostModel() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { state, actions } = useHomePageContext();
  const { isModelOpen, modeModel, blogDataUpdate } = state;

  const dispatch = useAppDispatch();
  const updateBlogLoading = useAppSelector(
    (state: RootState) => state.blog.createBlogLoading
  );

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

  const renderTitle = () => {
    switch (modeModel) {
      case ModeModel.CREATE:
        return 'Create New Blog';
      default:
        return 'Update Blog';
    }
  };
  const resetForm = () => {
    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = (data: uploadDataType) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);

    if (data.attachment) {
      formData.append('attachment', data.attachment);
    }

    const payload = {
      id: blogDataUpdate?._id,
      formData,
      onSuccess: () => {
        actions.onOpenModel(false);
        actions.onSelectBlogUpdate(null);
        dispatch(blogActions.getAllBlog());
      }
    };
    console.log('🚀 ~ Form Data:', Object.fromEntries(formData.entries()));

    dispatch(
      modeModel === ModeModel.CREATE
        ? blogActions.createBlog(payload)
        : blogActions.updateBlog(payload)
    );

    resetForm();
  };

  useEffect(() => {
    if (modeModel === ModeModel.EDIT) {
      form.reset({
        title: blogDataUpdate?.title,
        content: blogDataUpdate?.content,
        attachment: undefined
      });
    } else {
      form.reset({
        title: '',
        content: '',
        attachment: undefined
      });
    }
  }, [modeModel, form, blogDataUpdate]);

  return (
    <Dialog
      open={isModelOpen}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          actions.onOpenModel(true);
          actions.onChangeModeModel(ModeModel.CREATE);
        } else {
          actions.onSelectBlogUpdate(null);
          actions.onOpenModel(false);
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
          <DialogTitle className='text-center'>{renderTitle()}</DialogTitle>
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
                      <Textarea className='max-h- min-h-32' {...field} />
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
              <Button
                disabled={updateBlogLoading}
                className='w-full cursor-pointer'
                type='submit'
              >
                {updateBlogLoading && (
                  <Loader2 className='animate-spin opacity-65' />
                )}
                {!updateBlogLoading &&
                  (modeModel === ModeModel.CREATE ? 'Create' : 'Update')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
