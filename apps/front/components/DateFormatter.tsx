import { format } from 'date-fns';

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  return (
    <time className="text-slate-400" dateTime={dateString}>
      {format(new Date(dateString), 'LLLL	d, yyyy')}
    </time>
  );
};

export { DateFormatter };
