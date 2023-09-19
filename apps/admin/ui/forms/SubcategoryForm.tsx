import {
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
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
import { useForm } from 'react-hook-form';
import { ICategory, ISubCategory } from '../../utils/types';
import Loader from '../components/Loader';

interface ISubcategoryFormProps {
  subcategoryById: ISubCategory;
  categories: ICategory[];
}

const SubcategoryForm = ({
  subcategoryById,
  categories,
}: ISubcategoryFormProps) => {
  const [updateSubcategory, { isLoading: updating }] =
    useUpdateSubcategoryMutation();
  const [createSubcategory, { isLoading: creating }] =
    useCreateSubcategoryMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubCategory>();

  const onSubmit = handleSubmit((data) => {
    subcategoryById._id
      ? updateSubcategory({
          ...data,
          _id: subcategoryById._id,
        })
      : createSubcategory(data);

    router.push('/subcategories');
  });

  if (updating || creating) {
    return <Loader />;
  }

  return (
    <>
      <FormControl variant="standard" style={{ width: '100%' }}>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <TextField
                {...register('title')}
                defaultValue={subcategoryById.title}
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Slug</FormLabel>
              <TextField
                {...register('slug')}
                defaultValue={subcategoryById.slug}
                className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <TextField
                {...register('description')}
                defaultValue={subcategoryById.description}
                className={`form-control ${
                  errors.description ? 'is-invalid' : ''
                }`}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                {...register('category')}
                defaultValue={subcategoryById?.category?._id ?? ''}
                name="category"
                className={`form-control ${
                  errors.category ? 'is-invalid' : ''
                }`}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //value={age}
                label="App"
                //onChange={handleChange}
              >
                <MenuItem value="">Select Category</MenuItem>
                {(categories || []).map((category: ICategory) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.title}
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
    </>
  );
};

export { SubcategoryForm };
