import React, { createContext, useContext } from 'react';
import { useHomePageReducer } from '~/page/HomePage/reducer/homePageReducer';
import { actionsCreatorProps, homePageStates } from '~/page/HomePage/types';

interface HomePageContextProps {
  state: homePageStates;
  actions: actionsCreatorProps;
}

const HomePageContext = createContext<HomePageContextProps | undefined>(
  undefined
);

export const HomePageProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [state, actions] = useHomePageReducer();
  return (
    <HomePageContext.Provider value={{ state, actions }}>
      {children}
    </HomePageContext.Provider>
  );
};

const useHomePageContext = (): HomePageContextProps => {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error(
      'useHomePageContext must be used within a HomePageProvider'
    );
  }
  return context;
};

export default useHomePageContext;
