import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@j4db/redux-services';
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IApp, ICategory } from '../../utils/types';
import Loader from '../components/Loader';

interface ICategoryFormProps {
  categoryById: ICategory;
  apps: IApp[];
}

const CategoryForm = ({ categoryById, apps }: ICategoryFormProps) => {
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICategory>();

  const onSubmit = handleSubmit((data) => {
    categoryById._id
      ? updateCategory({
          ...data,
          _id: categoryById._id,
        })
      : createCategory(data);

    router.push('/categories');
  });

  useEffect(() => {
    reset(categoryById);
  }, [reset, categoryById]);

  if (updating || creating) {
    return <Loader />;
  }

  return (
    <FormControl variant="standard" style={{ width: '100%' }}>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <TextField
              {...register('title')}
              defaultValue={categoryById.title}
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Slug</FormLabel>
            <TextField
              {...register('slug')}
              defaultValue={categoryById.slug}
              className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <TextField
              {...register('description')}
              defaultValue={categoryById.description}
              className={`form-control ${
                errors.description ? 'is-invalid' : ''
              }`}
            />
          </FormControl>
          <FormControl>
            <FormLabel>App</FormLabel>
            <Select
              {...register('app')}
              defaultValue={categoryById?.app?._id ?? ''}
              name="app"
              className={`form-control ${errors.app ? 'is-invalid' : ''}`}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //value={age}
              label="App"
              //onChange={handleChange}
            >
              <MenuItem value="">Select App</MenuItem>
              {(apps || []).map((app: IApp) => (
                <MenuItem key={app._id} value={app._id}>
                  {app.title}
                </MenuItem>
              ))}
            </Select>
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

export { CategoryForm };
