import { FieldErrors, useForm } from 'react-hook-form';

interface LoginForm {
  username: string;
  email: string;
  password: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: 'onChange',
  });
  const onValid = (data: LoginForm) => {
    console.log("I'm valid, yo!");
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <div>
        <input
          {...register('username', {
            required: 'Username is required',
            minLength: {
              message: 'The username should be longer than 5 characters.',
              value: 5,
            },
          })}
          type="text"
          placeholder="Username"
        />
        {errors.username?.message}
      </div>
      <div>
        <input
          {...register('email', {
            required: 'Email is required',
            validate: {
              notGmail: (value) =>
                !value.includes('@naver.com') || 'You cannot use Naver email.',
            },
          })}
          type="email"
          placeholder="Email"
        />
        {errors.email?.message}
      </div>
      <div>
        <input
          {...register('password', {
            required: 'Password is required',
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password?.message}
      </div>
      <input type="submit" value="Create Account" />
    </form>
  );
}
