import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useOnboardingStore } from '~/stores/onboardingStore';

export const useInitialRouteRedirect = () => {
  const router = useRouter();
  const { isFirstLaunch, checkFirstLaunch } = useOnboardingStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const init = async () => {
      await checkFirstLaunch();
      setChecked(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (checked && isFirstLaunch) {
      router.replace('/onboarding');
    }
  }, [checked, isFirstLaunch, router]);

  return { loading: !checked || isFirstLaunch };
};
