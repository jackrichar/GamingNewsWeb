import React, {createContext} from 'react';

export const AppValueContext = createContext();

export const AppContext = ({children}) => {
    const NavStatus = null;

    return (
        <AppValueContext.Provider value={NavStatus}>
            {children}
        </AppValueContext.Provider>
    );
};
