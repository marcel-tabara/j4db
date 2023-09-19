'use client';
import {
  useCreateAppMutation,
  useUpdateAppMutation,
} from '@j4db/redux-services';
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IApp } from '../../utils/types';
import { slugify } from '../../utils/utils';
import Loader from '../components/Loader';

interface IAppFormProps {
  appById: IApp | undefined;
}

const AppForm = ({ appById }: IAppFormProps) => {
  const router = useRouter();
  const [updateApp, { isLoading: updating }] = useUpdateAppMutation();
  const [createApp, { isLoading: creating }] = useCreateAppMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IApp>();

  useEffect(() => {
    reset(appById);
  }, [reset, appById]);

  const onSubmit = handleSubmit(async (data) => {
    appById?._id
      ? await updateApp({
          ...data,
          _id: appById?._id,
          dateModified: new Date().toISOString(),
        })
      : await createApp({
          ...data,
          dateModified: new Date().toISOString(),
        });

    router.push('/apps');
  });

  if (updating || creating) {
    return <Loader />;
  }

  return (
    <FormControl variant="standard" style={{ width: '100%' }}>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormControl>
            <FormLabel>URL</FormLabel>
            <TextField
              {...register('url')}
              defaultValue={appById?.url}
              className={`form-control ${errors.url ? 'is-invalid' : ''}`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <TextField
              {...register('title')}
              defaultValue={appById?.title}
              onChange={(event) =>
                setValue('slug', slugify(event.target.value))
              }
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Slug</FormLabel>
            <TextField
              {...register('slug')}
              defaultValue={appById?.slug}
              className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <TextField
              {...register('image')}
              defaultValue={appById?.image}
              className={`form-control ${errors.image ? 'is-invalid' : ''}`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Section</FormLabel>
            <TextField
              {...register('section')}
              defaultValue={appById?.section}
              className={`form-control ${errors.section ? 'is-invalid' : ''}`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Keywords</FormLabel>
            <TextField
              {...register('keywords')}
              defaultValue={appById?.keywords?.toString()}
              className={`form-control ${errors.keywords ? 'is-invalid' : ''}`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Author Name</FormLabel>
            <TextField
              {...register('authorName')}
              defaultValue={appById?.authorName}
              className={`form-control ${
                errors.authorName ? 'is-invalid' : ''
              }`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <TextField
              {...register('description')}
              rows={10}
              multiline
              defaultValue={appById?.description}
              className={`form-control ${
                errors.description ? 'is-invalid' : ''
              }`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Body</FormLabel>
            <TextField
              {...register('body')}
              rows={20}
              multiline
              defaultValue={appById?.body}
              className={`form-control ${errors.body ? 'is-invalid' : ''}`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Publisher Name</FormLabel>
            <TextField
              {...register('publisherName')}
              defaultValue={appById?.publisherName}
              className={`form-control ${
                errors.publisherName ? 'is-invalid' : ''
              }`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Publisher Logo</FormLabel>
            <TextField
              {...register('publisherLogo')}
              defaultValue={appById?.publisherLogo}
              className={`form-control ${
                errors.publisherLogo ? 'is-invalid' : ''
              }`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date Created</FormLabel>
            <TextField
              {...register('dateCreated')}
              defaultValue={appById?.dateCreated}
              className={`form-control ${
                errors.dateCreated ? 'is-invalid' : ''
              }`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date Published</FormLabel>
            <TextField
              {...register('datePublished')}
              defaultValue={appById?.datePublished}
              className={`form-control ${
                errors.datePublished ? 'is-invalid' : ''
              }`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Key Override</FormLabel>
            <TextField
              {...register('keyOverride')}
              defaultValue={appById?.keyOverride}
              className={`form-control ${
                errors.keyOverride ? 'is-invalid' : ''
              }`}
            />
          </FormControl>
          <FormControl>
            <Button type="submit" className="btn btn-primary">
              Save
            </Button>
          </FormControl>
        </FormGroup>
      </form>
    </FormControl>
  );
};

export { AppForm };
