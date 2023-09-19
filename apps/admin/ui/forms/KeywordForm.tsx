import {
  useCreateKeywordMutation,
  useUpdateKeywordMutation,
} from '@j4db/redux-services';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IKeyword } from '../../utils/types';
import Loader from '../components/Loader';

interface IKeywordFormProps {
  keywordById: IKeyword;
}

const KeywordForm = ({ keywordById }: IKeywordFormProps) => {
  const [updateKeyword, { isLoading: updating }] = useUpdateKeywordMutation();
  const [createKeyword, { isLoading: creating }] = useCreateKeywordMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IKeyword>();

  const onSubmit = handleSubmit((data) => {
    keywordById._id
      ? updateKeyword({
          ...data,
          _id: keywordById._id,
        })
      : createKeyword(data);

    router.push('/keywords');
  });

  if (updating || creating) {
    return <Loader />;
  }

  return (
    <div className="register-form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <h6>Keyword Title</h6>
          <input
            {...register('title')}
            defaultValue={keywordById?.title}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>Article</h6>
          <textarea
            {...register('article')}
            defaultValue={keywordById?.article?._id}
            className={`form-control ${errors.article ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <h6>Article Link</h6>
          <input
            {...register('articleLink')}
            defaultValue={keywordById?.articleLink?._id}
            className={`form-control ${errors.articleLink ? 'is-invalid' : ''}`}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export { KeywordForm };
