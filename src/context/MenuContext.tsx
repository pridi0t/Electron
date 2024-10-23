import React, { createContext, useContext, useState } from "react";

interface MenuContextType {
    currentCategory: string;
    setCategory: (category: string) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

// 컨텍스트 프로바이더
export const MenuProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [currentCategory, setCurrentCategory] = useState<string>("");

    const setCategory = (category: string) => {
        setCurrentCategory(category);
    };

    return (
        <MenuContext.Provider value={{ currentCategory, setCategory }}>
            {children}
        </MenuContext.Provider>
    );
};

// (useContext에 쉽게 접근하기 위한) 컨텍스트 훅
export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("[ERROR/CONTEXT] useMenu Error");
    }
    return context;
}