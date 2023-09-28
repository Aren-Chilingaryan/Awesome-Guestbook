import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Visitor } from '../types/types';

interface VisitorsContextProps {
    visitors: Visitor[];
    setVisitors: React.Dispatch<React.SetStateAction<Visitor[]>>;
}

const VisitorsContext = createContext<VisitorsContextProps | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const VisitorsProvider: React.FC<Props> = ({ children }) => {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    return (
        <VisitorsContext.Provider value={{ visitors, setVisitors }}>
            {children}
        </VisitorsContext.Provider>
    );
}

export const useVisitors = (): VisitorsContextProps => {
    const context = useContext(VisitorsContext);
    if (!context) {
        throw new Error('useVisitors must be used within a VisitorsProvider');
    }
    return context;
}