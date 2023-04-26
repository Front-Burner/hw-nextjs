import { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export function LocationWrapper({ children }) {
  const [sharedState, setShareState] = useState({
    id: 0,
    title: 'Choose Location',
    slug: 'locations'
  });
  
  return (
    <LocationContext.Provider value={[sharedState, setShareState]}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  return useContext(LocationContext);
}