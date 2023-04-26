import { createContext, useContext, useState } from 'react';

const IntroLocContext = createContext();

export function IntroLocationWrapper({ children }) {
  const [introLocState, setIntroLocState] = useState(false);
  
  return (
    <IntroLocContext.Provider value={[introLocState, setIntroLocState]}>
      {children}
    </IntroLocContext.Provider>
  );
}

export function useIntroLocContext() {
  return useContext(IntroLocContext);
}