import { useState } from 'react';

// тут інкапсульована спільна для логіну і реєстрації логіка, щоб уникнути дублювання коду
const useAuthFormCommon = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = () => {
    setBackendError(null);
  };

  return {
    showPassword,
    backendError,
    togglePasswordVisibility,
    handleChange,
    setBackendError, // still exposing this in case specific hooks need to set error directly
  };
};

export default useAuthFormCommon;
