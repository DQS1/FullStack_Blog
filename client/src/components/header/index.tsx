import { Link } from 'react-router-dom';
import UserMenu from '~/components/header/components/userMenu';
import { TypographyH3 } from '~/components/ui/typographyH3';

const Header = () => {
  return (
    <div className='flex justify-between bg-sky-700 px-[4%] py-1.5 text-white select-none'>
      <Link to={'/home'}>
        <TypographyH3 className='cursor-pointer'>Blog</TypographyH3>
      </Link>
      <UserMenu />
    </div>
  );
};

export default Header;
