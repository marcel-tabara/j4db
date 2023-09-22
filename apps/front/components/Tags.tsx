import { Typography } from '@mui/material';

interface ITagsProps {
  tags: string;
}
export const Tags = ({ tags = '' }: ITagsProps) => {
  return (
    <Typography>
      {tags.split(',').map((t: string) => {
        return `#${t} `;
      })}
    </Typography>
  );
};
