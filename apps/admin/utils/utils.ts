export const slugify = (str: string) => {
  return str
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-');
};

// export type SortOrder = 'asc' | 'desc';
// export type DataTypes = 'bigint' | 'boolean' | 'number' | 'string';
// export interface ILocalCompareOptions {
//   caseFirst: 'upper' | 'lower' | 'false';
//   ignorePunctuation: 'true' | 'false';
//   localeMatcher: 'lookup' | 'best fit';
//   numeric: 'true' | 'false';
//   sensitivity: 'base' | 'accent' | 'case' | 'variant';
//   usage: 'sort' | 'search';
// }

// export const sortArrayByObjectField = <
//   K extends string,
//   T extends Partial<Record<K, unknown>>,
// >(
//   items: T[],
//   field: K,
//   order: SortOrder = 'asc',
//   locale: string = 'en',
//   options?: ILocalCompareOptions,
// ) => {
//   const withDataType = (a: T, b: T) => {
//     const isValid = Boolean(a[field]) && Boolean(b[field]);

//     if (isValid) {
//       switch (typeof a[field]) {
//         case 'string':
//           return a[field].localeCompare(b[field], locale, options);
//         case 'number':
//         case 'boolean':
//           return a[field] - b[field];
//         case 'object':
//           return a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
//         default:
//           return [];
//       }
//     } else if (Boolean(a[field]) && !Boolean(b[field])) {
//       return -1;
//     } else if (!Boolean(a[field]) && Boolean(b[field])) {
//       return 1;
//     }
//     return 0;
//   };
//   const withOrder = (a: T, b: T) => {
//     switch (order) {
//       case 'asc':
//         return withDataType(a, b);
//       case 'desc':
//         return withDataType(b, a);
//       default:
//         break;
//     }
//   };

//   return !items ? [] : items.sort((a: T, b: T) => withOrder(a, b));
// };
