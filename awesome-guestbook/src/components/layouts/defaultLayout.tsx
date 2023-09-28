

import { ReactNode } from 'react';
import '../../styles/layout.css';
import Header from "./header"

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header/>
            <div className='PageContainer'>
                {children}
            </div>
        </div>
    )
}

export default Layout;
