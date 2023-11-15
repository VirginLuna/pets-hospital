import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormControl, Stack, TextField } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, string, TypeOf } from 'zod';

const formSchema = object({
  username: string().min(1, '必填'),
  pwd: string().min(1, '必填'),
});

type formInput = TypeOf<typeof formSchema>;

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    reset,
    getValues,
    setValue,
    handleSubmit,
  } = useForm<formInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      pwd: '',
    },
  });
  const submit = (data: any) => {
    console.log(data);
    navigate('/main');
  };
  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit((values) => {
        submit(values);
      })}
    >
      <Stack direction='row' spacing={2}>
        <FormControl fullWidth>
          <TextField
            variant='standard'
            fullWidth
            size='small'
            required
            label='账号'
            sx={{ mb: 2 }}
            error={!!errors['username']}
            helperText={errors['username'] ? errors['username'].message : ''}
            {...register('username')}
          />
        </FormControl>
      </Stack>
      <Stack direction='row' spacing={2}>
        <FormControl fullWidth>
          <TextField
            variant='standard'
            fullWidth
            size='small'
            required
            label='密码'
            type='password'
            sx={{ mb: 2 }}
            error={!!errors['pwd']}
            helperText={errors['pwd'] ? errors['pwd'].message : ''}
            {...register('pwd')}
          />
        </FormControl>
      </Stack>
      <Stack direction='row' spacing={2}>
        <Button variant='contained' type='submit'>
          Contained
        </Button>
      </Stack>
    </Box>
  );
}
