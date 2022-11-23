import { BoldElementProps } from './type';

export const BoldElement = (props: BoldElementProps) => {
  return (
    <p {...props.attributes}>
      <strong>{props.children}</strong>
    </p>
  );
};
