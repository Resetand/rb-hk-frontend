import { block } from 'bem-cn';
import * as React from 'react';
import './ClientPage.scss';
import { Avatar, Spin } from 'antd';
const b = block('ClientPage');

const ClientPage: React.FC = () => {
    // const [strategiesList, setStrategiesList] = React.useState([]);

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    // const;

    if (loading) {
        return (
            <div className={b('loading')}>
                <Spin />
            </div>
        );
    }

    return (
        <div className={b()}>
            <div className="container">
                <div className={b('user-name')}>
                    <Avatar icon="user" size="large" />
                </div>
            </div>
        </div>
    );
};

export default ClientPage;
