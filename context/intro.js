import { createContext, useContext, useState } from 'react';

const IntroContext = createContext();

export function IntroWrapper({ children }) {
  const [introState, setIntroState] = useState(false);
  
  return (
    <IntroContext.Provider value={[introState, setIntroState]}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntroContext() {
  return useContext(IntroContext);
}