import { useEffect } from 'react';

const onFocusEv = (val) => {
  if (val) {
      document.title = val
  }
};

const onBlurEv = (val) => {
    if (val) {
        document.title = val
    }
};

const FocusWindow = () => {
  const currentTitle = "Find stuff only in Simple Commerce";
  const messageOnLeave = "Hi, Check our New Promo only in Limited Time";
  useEffect(() => {
    window.addEventListener('focus', () => {
        onFocusEv(currentTitle);
    })
    window.addEventListener('blur', () => {
        onBlurEv(messageOnLeave);
    })
    return () => {
      window.removeEventListener('focus', onFocusEv);
      window.removeEventListener('blur', onBlurEv);
    };
  }, []);

  return null;
};

export default FocusWindow;