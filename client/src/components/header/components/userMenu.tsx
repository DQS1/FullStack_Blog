import { ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu';
import { authActions } from '~/features/auth/authSlice';
import { useAppDispatch } from '~/hooks/useAppDispatch';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='group relative ml-auto inline-block cursor-pointer active:scale-95'>
          <Avatar className='size-10'>
            <AvatarImage src={'https://github.com/shadcn.png'} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className='absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-700'>
            <ChevronDown className='h-3 w-3 text-white' />
          </span>
          <span className='pointer-events-none absolute inset-0 rounded-full bg-[#C0C0C0]/30 opacity-0 transition group-hover:opacity-100 group-active:scale-95' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side='bottom' align='end'>
        <DropdownMenuItem
          onClick={() => {
            navigate('/me');
          }}
          className='cursor-pointer'
        >
          <span>Me</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            dispatch(
              authActions.logout({
                onSuccess: () => {
                  navigate('/');
                }
              })
            );
          }}
          className='cursor-pointer'
        >
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
