import {
  appByIdSelector,
  appsSelector,
  articleByIdSelector,
  articlesSelector,
  categoriesSelector,
  categoryByIdSelector,
  keywordByIdSelector,
  keywordExtractionSelector,
  keywordsByArticleSelector,
  keywordsSelector,
  subcategoriesSelector,
  subcategoryByIdSelector,
} from '@j4db/redux-services';
import { useSelector } from 'react-redux';

interface IUseSelectorsProps {
  articleId?: string;
}

export const useSelectors = (props: IUseSelectorsProps = {}) => {
  const {
    data: articleById,
    available: articleByIdAvailable,
    fetching: articleByIdFetching,
    error: articleByIdError,
  } = useSelector(articleByIdSelector);

  const {
    data: articles,
    available: articlesAvailable,
    fetching: articlesFetching,
  } = useSelector(articlesSelector);

  const {
    data: apps,
    available: appsAvailable,
    fetching: appsFetching,
  } = useSelector(appsSelector);
  const {
    data: appById,
    available: appByIdAvailable,
    fetching: appByIdFetching,
  } = useSelector(appByIdSelector);

  const {
    data: keywords,
    available: keywordsAvailable,
    fetching: keywordsFetching,
  } = useSelector(keywordsSelector);

  const {
    data: extractedKeywords,
    available: extractedKeywordsAvailable,
    fetching: extractedKeywordsFetching,
  } = useSelector(keywordExtractionSelector);

  const {
    data: keywordById,
    available: keywordByIdAvailable,
    fetching: keywordByIdFetching,
  } = useSelector(keywordByIdSelector);

  const keywordsByArticleId = useSelector(keywordsByArticleSelector)(
    props?.articleId ?? ''
  );

  const {
    data: categoryById,
    available: categoryByIdAvailable,
    fetching: categoryByIdFetching,
  } = useSelector(categoryByIdSelector);

  const {
    data: categories,
    available: categoriesAvailable,
    fetching: categoriesFetching,
  } = useSelector(categoriesSelector);

  const {
    data: subcategoryById,
    available: subcategoryByIdAvailable,
    fetching: subcategoryByIdFetching,
  } = useSelector(subcategoryByIdSelector);

  const {
    data: subcategories,
    available: subcategoriesAvailable,
    fetching: subcategoriesFetching,
  } = useSelector(subcategoriesSelector);

  return {
    articles,
    articlesAvailable,
    articlesFetching,
    articleById,
    articleByIdAvailable,
    articleByIdFetching,
    articleByIdError,
    //
    apps,
    appsAvailable,
    appsFetching,
    appById,
    appByIdAvailable,
    appByIdFetching,
    //
    keywords,
    keywordsAvailable,
    keywordsFetching,
    keywordById,
    keywordByIdAvailable,
    keywordByIdFetching,
    keywordsByArticleId,
    //
    categories,
    categoriesAvailable,
    categoriesFetching,
    categoryById,
    categoryByIdAvailable,
    categoryByIdFetching,
    //
    subcategories,
    subcategoriesAvailable,
    subcategoriesFetching,
    subcategoryById,
    subcategoryByIdAvailable,
    subcategoryByIdFetching,
    //
    extractedKeywords,
    extractedKeywordsAvailable,
    extractedKeywordsFetching,
  };
};
