import { DARK, LIGHT } from '@/constants/theme-colors.const';

interface ICustomColors {
  DARK?: string;
  LIGHT?: string;
}

export const useThemeColor = () => {
  const { theme } = useTheme();

  const getThemeColor = (
    colorName: keyof typeof DARK & keyof typeof LIGHT,
    customColors?: ICustomColors,
  ) => {
    const customColor = customColors?.[theme as keyof ICustomColors];
    const themeColor = theme === 'DARK' ? DARK[colorName] : LIGHT[colorName];

    return customColor || themeColor;
  };

  return { getThemeColor };
};
