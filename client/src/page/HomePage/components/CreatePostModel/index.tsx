import { Plus } from 'lucide-react';
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
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';

export default function CreatePostModel() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FloatingActionButton icon={<Plus />} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[525px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>Create New Post</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4 py-4'>
          <div className='flex flex-col items-start gap-4'>
            <Label htmlFor='name' className='text-right'>
              Title
            </Label>
            <Input id='name' value='Pedro Duarte' className='col-span-3' />
          </div>
          <div className=''>
            <Textarea className='min-h-32' />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Input type='file' />
          </div>
        </div>
        <DialogFooter>
          <Button className='w-full' type='submit'>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
