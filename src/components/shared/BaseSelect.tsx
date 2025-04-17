import { RefSelectProps, Select, SelectProps } from 'antd';
import { forwardRef } from 'react';

interface IProps extends SelectProps {}

export const BaseSelect = forwardRef<RefSelectProps, IProps>((props, ref) => {
  const { ...otherProps } = props;

  return <Select ref={ref} {...otherProps} />;
});

BaseSelect.displayName = 'BaseSelect';
