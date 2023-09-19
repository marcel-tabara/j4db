import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { FocusEvent } from 'react';

const SimpleMdeEditor = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

interface MDEWrapperProps {
  value: string;
  onChange?: (value: string) => void;
  onBlur: (e: FocusEvent<HTMLDivElement, Element>) => void;
}

const MDEWrapper = ({ value, onChange, onBlur }: MDEWrapperProps) => {
  return (
    <div>
      <SimpleMdeEditor value={value} onChange={onChange} onBlur={onBlur} />
    </div>
  );
};

export { MDEWrapper };
