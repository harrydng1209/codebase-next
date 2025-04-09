import { Dropdown, DropdownProps } from 'antd';

interface IProps extends DropdownProps {}

export const BaseDropdown: React.FC<IProps> = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Dropdown trigger={['click']} {...otherProps}>
      {children}
    </Dropdown>
  );
};
