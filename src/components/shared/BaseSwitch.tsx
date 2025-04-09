import { Switch, SwitchProps } from 'antd';

interface IProps extends SwitchProps {}

export const BaseSwitch: React.FC<IProps> = (props) => {
  const { ...otherProps } = props;

  return <Switch {...otherProps} />;
};
