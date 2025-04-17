'use client';
interface IProps extends React.PropsWithChildren {}

export const GuestLayout: React.FC<IProps> = (props) => {
  const { children } = props;

  return <>{children}</>;
};
