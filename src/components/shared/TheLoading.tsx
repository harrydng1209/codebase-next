import { useLoadingStore } from '@/stores/loading.store';
import { Spin } from 'antd';

export const TheLoading: React.FC = () => {
  const loadingStore = useLoadingStore();

  if (!loadingStore.getIsLoading()) return null;

  return <Spin fullscreen={true} size="large" tip="Loading" />;
};
