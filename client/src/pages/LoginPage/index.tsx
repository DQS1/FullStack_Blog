import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form as RouterForm, useActionData } from 'react-router-dom';
import { z } from 'zod';
import loginBg from '~/assets/img/login-bg.png';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export interface LoginRequest {
  email: string;
  password: string;
}

const loginSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  // remember: z.boolean().optional()
});

const Login = () => {
  const actionData = useActionData() as { message?: string } | undefined;
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'admin@123'
    }
  });

  // const onSubmit = (values: z.infer<typeof loginSchema>): void => {
  //   // console.log('Form submitted:', values);
  //   // dispatch(authActions.login(values));
  // };

  return (
    <div
      className='relative flex min-h-screen items-center justify-center bg-cover bg-center'
      style={{
        backgroundImage: `url(${loginBg})`
      }}
    >
      <Card className='z-10 w-full max-w-md bg-white/10 backdrop-blur-xs'>
        <CardContent className='p-8'>
          <h2 className='mb-4 text-center text-2xl font-bold text-white'>
            Login
          </h2>

          <Form {...form}>
            <RouterForm
              // onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-[22px]'
              autoComplete='off'
              method='post'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <Label className='text-white'>Email</Label>
                    <FormControl>
                      <div className='relative'>
                        <Mail
                          className='absolute top-1/2 right-3 -translate-y-1/2 transform text-white'
                          size={18}
                        />
                        <Input
                          autoComplete='new-email'
                          placeholder='you@example.com'
                          {...field}
                          className='bg-white/20 text-white placeholder:text-white'
                        />
                      </div>
                    </FormControl>
                    <FormMessage className='absolute bottom-[-22px] text-red-300' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <Label className='text-white'>Password</Label>
                    <FormControl>
                      <div className='relative'>
                        <div
                          className='cursor-pointer text-white select-none'
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        >
                          <span className='block h-full w-full'>
                            <Eye
                              className={`absolute top-1/2 right-3 -translate-y-1/2 transform transition-opacity duration-500 ${showPassword ? 'opacity-0' : 'opacity-100'} `}
                              size={20}
                            />
                            <EyeOff
                              className={`absolute top-1/2 right-3 -translate-y-1/2 transform transition-opacity duration-500 ${showPassword ? 'opacity-100' : 'opacity-0'} `}
                              size={20}
                            />
                          </span>
                        </div>
                        <Input
                          autoComplete='new-password'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='password'
                          {...field}
                          className='bg-white/20 text-white placeholder:text-white'
                        />
                      </div>
                    </FormControl>
                    <FormMessage className='absolute bottom-[-22px] text-red-300' />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name='remember'
                render={({ field }) => (
                  <FormItem className='space-x- flex items-center'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className='ring-offset-0 focus:ring-0 data-[state=checked]:bg-white/80 data-[state=checked]:text-black'
                      />
                    </FormControl>
                    <FormLabel className='text-white'>Remember me</FormLabel>
                  </FormItem>
                )}
              /> */}

              {actionData?.message && (
                <p className='text-sm text-red-500'>{actionData.message}</p>
              )}
              <Button
                type='submit'
                className='text-black-700 w-full cursor-pointer bg-white hover:bg-purple-200'
              >
                Login
              </Button>
            </RouterForm>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
