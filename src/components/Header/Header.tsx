import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {
    return (
        <div className="container">
            <div className="Header">
                <nav>
                    <ul>
                        <li>
                            <Button type="link">
                                <Link to="/">Home</Link>
                            </Button>
                        </li>
                        <li>
                            <Button type="link">
                                <Link to="/about">About</Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;
