import {
  IApp,
  IArticle,
  ICategory,
  IKeyword,
  ISubCategory,
} from '@j4db/redux-services';
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Controller, useForm } from 'react-hook-form';
import { MDEWrapper } from '../components/MDEWrapper';
import { useArticleForm } from '../hooks/useArticleForm';

interface IArticleFormProps {
  onChangeCategory: (event: SelectChangeEvent<string>) => void;
  onChangeApp: (event: SelectChangeEvent<string>) => void;
  subcategories: ISubCategory[];
  categories: ICategory[];
  article: IArticle;
  allApps: IApp[];
}

const ArticleForm = ({
  onChangeCategory,
  onChangeApp,
  categories = [],
  subcategories = [],
  article,
  allApps,
}: IArticleFormProps) => {
  const { handleSubmit, register, setValue, control, formState } =
    useForm<IArticle>();

  const { errors } = formState;
  const {
    onAddKeyword,
    onAddKeywords,
    onBodyChange,
    onChangeTitle,
    onRemoveKeyword,
    onSubmit,
    extractedKeywords,
    selectedKeywords,
  } = useArticleForm({
    article,
    onChangeApp,
    onChangeCategory,
    handleSubmit,
    setValue,
  });

  const onExtractedClick = ({
    event,
    existing,
  }: {
    event: React.MouseEvent<HTMLLIElement, MouseEvent>;
    existing: boolean;
  }) => {
    !existing && onAddKeyword(event);
  };

  return (
    <>
      <FormControl variant="standard" style={{ width: '100%' }}>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <FormControl>
              <FormLabel>Url</FormLabel>
              <TextField
                {...register('url')}
                defaultValue={article?.url}
                className={`form-control ${errors.url ? 'is-invalid' : ''}`}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <TextField
                {...register('title')}
                defaultValue={article?.title}
                onChange={onChangeTitle}
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Slug</FormLabel>
              <TextField
                {...register('slug')}
                defaultValue={article?.slug}
                className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
              />
            </FormControl>
            <FormControl>
              <FormLabel>App</FormLabel>
              <Controller
                control={control}
                name="app"
                defaultValue={article?.app}
                render={({ field: { value, onChange } }) => (
                  <Select
                    {...register('app')}
                    defaultValue={article?.app?._id ?? ''}
                    name="app"
                    onChange={onChangeApp}
                    className={`form-control ${errors.app ? 'is-invalid' : ''}`}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="App"
                  >
                    <MenuItem value="">Select App</MenuItem>
                    {(allApps || []).map((app: IApp) => (
                      <MenuItem key={app._id} value={app._id}>
                        {app.title}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Controller
                control={control}
                name="category"
                defaultValue={article?.category}
                render={({ field: { value, onChange } }) => (
                  <Select
                    {...register('category')}
                    defaultValue={value?._id ?? ''}
                    onChange={(e) => {
                      onChangeCategory(e);
                      onChange(e);
                    }}
                    className={`form-control ${
                      errors.category ? 'is-invalid' : ''
                    }`}
                  >
                    <MenuItem key="category.select" value="" disabled>
                      Select Category
                    </MenuItem>
                    {(categories || []).map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.title}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>SubCategory</FormLabel>
              <Controller
                control={control}
                name="subcategory"
                defaultValue={article?.subcategory}
                render={({ field: { value, onChange } }) => (
                  <Select
                    {...register('subcategory')}
                    defaultValue={value?._id ?? ''}
                    onChange={onChange}
                    className={`form-control ${
                      errors.subcategory ? 'is-invalid' : ''
                    }`}
                  >
                    <MenuItem key="subcategory.select" value="">
                      Select SubCategory
                    </MenuItem>
                    {(subcategories || []).map((subcategory) => (
                      <MenuItem key={subcategory._id} value={subcategory._id}>
                        {subcategory.title}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <TextField
                {...register('image')}
                defaultValue={article?.image}
                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Author Name</FormLabel>
              <TextField
                {...register('authorName')}
                defaultValue={article?.authorName}
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
                {...register('description')}
                defaultValue={article?.description}
                className={`form-control ${
                  errors.description ? 'is-invalid' : ''
                }`}
              />
            </FormControl>
            <FormControl>
              {extractedKeywords && (
                <>
                  <FormLabel>Extracted keywords</FormLabel>
                  <Accordion>
                    <AccordionSummary>
                      <Typography>
                        Total Extracted Keywords: {extractedKeywords.length}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="accordion-box">
                      <div className="container">
                        {(extractedKeywords || []).map(
                          (e: IKeyword, idx: number) => {
                            const existing = (selectedKeywords || [])
                              .map((s) => s.title)
                              .includes(e.title);
                            return (
                              <li
                                key={e.title + '_' + idx}
                                id={e.title}
                                onClick={(event) =>
                                  onExtractedClick({ event, existing })
                                }
                              >
                                {e.title}{' '}
                                <b>
                                  {e?.articleLink?.url !== e.article.url
                                    ? e?.articleLink?.url
                                    : ''}
                                </b>{' '}
                                {e?.articleLink?._id !== e?.article?._id
                                  ? e?.articleLink?._id
                                  : ''}
                                {existing && <b> existing</b>}
                              </li>
                            );
                          },
                        )}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </>
              )}
            </FormControl>
            <FormControl>
              {selectedKeywords && (
                <>
                  <FormLabel>Selected Keywords</FormLabel>
                  <Accordion>
                    <AccordionSummary>
                      <Typography>
                        Total Selected Keywords: {selectedKeywords.length}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="accordion-box">
                      <div className="container">
                        {selectedKeywords.map((e) => (
                          <li
                            key={e.title + e?.article?._id}
                            id={e.title}
                            onClick={onRemoveKeyword}
                          >
                            {e.title}{' '}
                            <b>
                              {article._id !== e?.articleLink?._id &&
                                e?.articleLink?.url}
                            </b>{' '}
                            {article._id !== e?.articleLink?._id &&
                              e?.articleLink?._id}
                            {!(extractedKeywords || [])
                              .map((e: IKeyword) => e.title)
                              .includes(e.title) && <b> non existing</b>}
                          </li>
                        ))}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Keywords</FormLabel>
              <TextField
                {...(register('keywords'),
                {
                  onBlur: (e) => onAddKeywords(e),
                })}
                defaultValue={(selectedKeywords || [])
                  .map((e) => e.title)
                  .toString()}
                className={`form-control ${
                  errors.keywords ? 'is-invalid' : ''
                }`}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Body</FormLabel>
              <Controller
                control={control}
                name="body"
                defaultValue={article?.body}
                render={({ field: { value, onChange } }) => (
                  <MDEWrapper
                    value={value || ''}
                    onChange={onChange}
                    onBlur={() => onBodyChange(value || '')}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>PublisherName</FormLabel>
              <TextField
                {...register('publisherName')}
                defaultValue={article?.publisherName}
                className={`form-control ${
                  errors.publisherName ? 'is-invalid' : ''
                }`}
              />
            </FormControl>
            <FormControl>
              <FormLabel>PublisherLogo</FormLabel>
              <TextField
                {...register('publisherLogo')}
                defaultValue={article?.publisherLogo}
                className={`form-control ${
                  errors.publisherLogo ? 'is-invalid' : ''
                }`}
              />
            </FormControl>
            <FormControl>
              <FormLabel>DateCreated</FormLabel>
              <TextField
                {...register('dateCreated')}
                defaultValue={article?.dateCreated}
                className={`form-control ${
                  errors.dateCreated ? 'is-invalid' : ''
                }`}
              />
            </FormControl>
            <FormControl>
              <FormLabel>DatePublished</FormLabel>
              <TextField
                {...register('datePublished')}
                defaultValue={article.datePublished}
                className={`form-control ${
                  errors.datePublished ? 'is-invalid' : ''
                }`}
              />
            </FormControl>
            <FormControl>
              <FormLabel>KeyOverride</FormLabel>
              <TextField
                {...register('keyOverride')}
                defaultValue={article?.keyOverride}
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
    </>
  );
};

export { ArticleForm };
