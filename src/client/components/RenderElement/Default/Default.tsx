import { DefaultElementProps } from './type';

export const DefaultElement = (props: DefaultElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};
