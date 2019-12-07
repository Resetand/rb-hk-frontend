import { Table, Tag } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';
import { block } from 'bem-cn';
import * as React from 'react';
import { fetchClients } from '../../api/routes';
import { ClientDesc } from '../../models/client';
import './ClientsListPage.scss';
import Search from 'antd/lib/input/Search';
import { useHistory } from 'react-router';
const b = block('ClientsListPage');

const ClientsListPage: React.FC = () => {
    const [loading, setLoading] = React.useState(true);
    const [clients, setClients] = React.useState<ClientDesc[]>([]);

    const history = useHistory();

    const tableSource = clients.map(client => ({
        key: client.name,
        ...client,
    }));

    React.useEffect(() => {
        fetchClients()
            .then(setClients)
            .then(() => setLoading(false));
    }, []);

    const columns: ColumnProps<ClientDesc>[] = [
        {
            title: 'First name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Bonuses',
            render: () => Math.floor(Math.random() * 100),
        },
        {
            title: 'Spent',
            render: () => Math.floor(Math.random() * 10000),
        },
        {
            title: 'Tariff Plan',
            dataIndex: 'tariffPlan',
            render: (_, { tariffPlan }) =>
                tariffPlan && (
                    <Tag style={{ fontWeight: 'bold', padding: '3px 10px' }}>
                        {tariffPlan.title}
                    </Tag>
                ),
        },
    ];

    return (
        <div className={b()}>
            <div className="container">
                <div className={b('head')}>
                    <Title level={2}>Clients</Title>
                    <Search
                        placeholder="input search text"
                        onSearch={value => alert(value)}
                        style={{ width: 300 }}
                    />
                </div>
                <Table
                    onRowClick={({ uuid }) => history.push(`/client/${uuid}`)}
                    dataSource={tableSource}
                    columns={columns}
                    loading={loading}
                ></Table>
            </div>
        </div>
    );
};

export default ClientsListPage;
