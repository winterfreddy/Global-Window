import React from 'react';
import '../../stylesheets/sidebar.scss';

class Sidebar extends React.Component {
    render() {
        return (
            <div>
                <header className='sidebar-header'>THIS IS SIDEBAR</header>
                <span className='sidebar-content-container'>
                    SIDEBAR CONTENT
                </span>
            </div>
        );
    }
}

export default Sidebar;