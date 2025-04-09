import { STORAGE_KEYS } from '@/constants/shared.const';
import { useLocalStorage } from 'usehooks-ts';

type TTheme = 'DARK' | 'LIGHT';

export const useTheme = () => {
  const [isDark, setIsDark] = useLocalStorage<boolean>(
    STORAGE_KEYS.THEME,
    false,
  );

  const changeTheme = () => setIsDark((state) => !state);

  const theme: TTheme = useMemo(() => (isDark ? 'DARK' : 'LIGHT'), [isDark]);

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isDark) {
      htmlElement.classList.add('dark');
      return;
    }
    htmlElement.classList.remove('dark');
  }, [isDark]);

  return {
    changeTheme,
    isDark,
    theme,
  };
};
