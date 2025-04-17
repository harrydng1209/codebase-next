'use client';
import { login } from '@/apis/auth.api';
import IconEye from '@/assets/icons/modules/auth/IconEye.svg';
import IconEyeClosed from '@/assets/icons/modules/auth/IconEyeClosed.svg';
import IconRequired from '@/assets/icons/shared/IconRequired.svg';
import styles from '@/assets/styles/components/auth/login.module.scss';
import { BaseButton } from '@/components/shared/BaseButton';
import { BaseFormItem } from '@/components/shared/BaseFormItem';
import { BaseInput } from '@/components/shared/BaseInput';
import { AUTH_PAGES, HOME } from '@/constants/route-pages.const';
import { REGEXES, SELECTORS } from '@/constants/shared.const';
import { useHandleCatchError } from '@/hooks/shared/use-handle-catch-error';
import { useRouter } from '@/i18n/navigation';
import { ILoginRequest } from '@/models/interfaces/auth.interface';
import { useAuthStore } from '@/stores/auth.store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object as yupObject, string as yupString } from 'yup';

const Login: React.FC = () => {
  const schema = yupObject({
    email: yupString()
      .required('Email is required')
      .matches(REGEXES.EMAIL, 'Invalid email format'),
    password: yupString()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  });
  const loginForm = useForm<ILoginRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const t = useTranslations();
  const authStore = useAuthStore();
  const router = useRouter();
  const { handleCatchError } = useHandleCatchError();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ILoginRequest> = async (values) => {
    try {
      const response = await login(values);
      authStore.setToken(response.data.accessToken);
      router.push(HOME);
    } catch (error) {
      handleCatchError(error);
    }
  };

  const renderIcon = (onClick: () => void) => {
    const IconComponent = showPassword ? IconEye : IconEyeClosed;
    return <IconComponent height="22" onClick={onClick} width="22" />;
  };

  return (
    <div className={styles['container']}>
      <section id={SELECTORS.LOGIN_SECTION}>
        <h4>{t('auth.login')}</h4>

        <FormProvider {...loginForm}>
          <Form layout="vertical" onFinish={loginForm.handleSubmit(onSubmit)}>
            <BaseFormItem
              label={
                <>
                  <span>{t('auth.email')}</span>
                  <IconRequired className="tw-ml-1" height="10" width="5" />
                </>
              }
              name="email"
            >
              <BaseInput placeholder="name@email.com" type="text" />
            </BaseFormItem>

            <BaseFormItem
              label={
                <>
                  <span>{t('auth.password')}</span>
                  <IconRequired className="tw-ml-1" height="10" width="5" />
                </>
              }
              name="password"
            >
              <BaseInput
                placeholder={t('auth.inputPassword')}
                suffix={renderIcon(togglePasswordVisibility)}
                type={showPassword ? 'text' : 'password'}
              />
            </BaseFormItem>

            <BaseButton className="tw-w-full tw-mt-2" htmlType="submit">
              {t('auth.login')}
            </BaseButton>
          </Form>
        </FormProvider>

        <div className={styles['container__register-now']}>
          <p>{t('auth.noAccount')}</p>
          <Link href={AUTH_PAGES.REGISTER}>{t('auth.registerNow')}</Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
