import {
  IArticle,
  useChatGptKeywordExtractionMutation,
  useCreateArticleMutation,
  useGetKeywordsByArticleIdQuery,
  useKeywordExtractionMutation,
  useUpdateArticleMutation,
} from '@j4db/redux-services';
import { SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form';
import { IKeyword } from '../../utils/types';
import { slugify } from '../../utils/utils';

interface Props {
  article: IArticle;
  onChangeApp: (event: SelectChangeEvent<string>) => void;
  onChangeCategory: (event: SelectChangeEvent<string>) => void;
  handleSubmit: UseFormHandleSubmit<IArticle, undefined>;
  setValue: UseFormSetValue<IArticle>; //(field: string, value: string) => void;
}

export const useArticleForm = ({
  article,
  onChangeApp,
  onChangeCategory,
  handleSubmit,
  setValue,
}: Props) => {
  const [selectedKeywords, setSelectedKeywords] = useState<IKeyword[]>([]);
  const [extractedKeywords, setExtractedKeywords] = useState<IKeyword[]>([]);
  const [updateArticle, { isLoading: updating }] = useUpdateArticleMutation();
  const [createArticle, { isLoading: creating }] = useCreateArticleMutation();
  const [keywordExtraction, { isLoading: extracting }] =
    useKeywordExtractionMutation();
  const [chatGptKeywordExtraction, { isLoading: chatGptExtracting }] =
    useChatGptKeywordExtractionMutation();

  const router = useRouter();

  const { data: keywordsByArticle } = useGetKeywordsByArticleIdQuery(
    article?._id ?? '',
  );

  useEffect(() => {
    keywordsByArticle?.length && setSelectedKeywords(keywordsByArticle);
  }, [keywordsByArticle]);

  useEffect(() => {
    Boolean(article?.app?._id) &&
      onChangeApp({
        target: { value: article?.app?._id },
      } as SelectChangeEvent<string>);
    Boolean(article?.category?._id) &&
      onChangeCategory({
        target: { value: article?.category?._id },
      } as SelectChangeEvent<string>);
  }, [
    article?.app?._id,
    article?.category?._id,
    onChangeApp,
    onChangeCategory,
  ]);

  const extractKeywords = useCallback(
    async (text: string) => {
      const extracted = (await keywordExtraction({
        _id: article._id,
        url: article.url,
        text,
      })) as { data: IKeyword[] };

      setExtractedKeywords(extracted?.data ?? []);
    },
    [article._id, article.url, keywordExtraction],
  );

  const chatGptExtractKeywords = useCallback(
    async (text: string) => {
      const extracted = await chatGptKeywordExtraction({
        _id: article._id,
        url: article.url,
        text,
      });
      console.log('########## extracted', extracted);
      //setExtractedKeywords(extracted?.data ?? []);
    },
    [article._id, article.url, chatGptKeywordExtraction],
  );

  useEffect(() => {
    article?.body && extractKeywords(article?.body);
  }, [article?.body, extractKeywords]);

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setValue('slug', slugify(event.target.value));
  };

  const onSubmit = handleSubmit((data: IArticle) => {
    article?._id
      ? updateArticle({
          ...data,
          _id: article?._id,
          keywords: selectedKeywords,
          dateModified: new Date().toISOString(),
        })
      : createArticle({
          ...data,
          keywords: selectedKeywords,
          dateModified: new Date().toISOString(),
        });
    router.push('/articles');
  });

  const onBodyChange = useCallback(
    async (e: string) => {
      if (e) {
        setValue('body', e);
        extractKeywords(e);
        //chatGptExtractKeywords(e);
      }
    },
    [chatGptExtractKeywords, extractKeywords, setValue],
  );
  const onAddKeyword = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      const find = extractedKeywords.find(
        (e: IKeyword) => e.title === (event.target as HTMLLIElement)?.id,
      );
      const newSelectedKeywords = find
        ? [...selectedKeywords].concat(find)
        : selectedKeywords;
      setSelectedKeywords(newSelectedKeywords);
      setValue(
        'keywords',
        newSelectedKeywords.map((e) => e),
      );

      // find.articleLink._id !== find.article._id &&
      //   setBody((prev) => {
      //     return prev
      //       .toLowerCase()
      //       .replace(find.title, `[${find.title}](${find.articleLink.url})`)
      //   })
      // setValue(
      //   'body',
      //   body
      //     .toLowerCase()
      //     .replace(find.title, `[${find.title}](${find.articleLink.url})`)
      // )
    },
    [extractedKeywords, selectedKeywords, setValue],
  );

  const onAddKeywords = useCallback(
    (
      event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    ) => {
      const keyws = event.target?.value.split(',');
      const newKeywords = keyws.map((k: string) => {
        return (
          (k.length > 0 &&
            extractedKeywords.find((e: IKeyword) => e.title === k)) || {
            article: {
              _id: article._id || '',
              url: article.url || '',
            },
            articleLink:
              {
                _id: article._id,
                url: article.url,
              } || '',
            title: k || '',
          }
        );
      }) as IKeyword[];
      setSelectedKeywords(newKeywords);
      setValue(
        'keywords',
        newKeywords.map((e: IKeyword) => e),
      );
    },
    [article._id, article.url, extractedKeywords, setValue],
  );

  const onRemoveKeyword = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      const newSelectedKeywords = selectedKeywords.filter(
        (e) => e.title !== (event.target as HTMLLIElement).id,
      );
      setSelectedKeywords(newSelectedKeywords);
      setValue(
        'keywords',
        newSelectedKeywords.map((e) => e),
      );
    },
    [selectedKeywords, setValue],
  );

  return {
    extractedKeywords,
    selectedKeywords,
    setSelectedKeywords,
    extractKeywords,
    onSubmit,
    onBodyChange,
    onChangeTitle,
    onAddKeyword,
    onAddKeywords,
    onRemoveKeyword,
    creating,
    updating,
    extracting,
    chatGptExtracting,
  };
};
