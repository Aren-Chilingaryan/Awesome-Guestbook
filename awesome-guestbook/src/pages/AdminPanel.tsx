import { useState, useEffect } from 'react';
import '../styles/AdminPanelStyles.css'
import { Visitor } from '../types/types';
import AddVisitor from "../components/addVisitor"
import VisitorManagement from "../components/visitorManagement"


const AdminPanel = () => {

    const [visitors, setVisitors] = useState<Visitor[]>([]);

    useEffect(() => {
        const storedVisitors = localStorage.getItem('visitors');
        if (storedVisitors) {
            setVisitors(JSON.parse(storedVisitors));
        }
    }, []);

    return (
        <div className='AdminPanelContainer'>
            <div className='AddVisitorComponentWrapper'>
                <AddVisitor />
            </div>

            <div className='VisitorManagementComponentWrapper'>
                <VisitorManagement />
            </div>


        </div>
    )
}

export default AdminPanel;
