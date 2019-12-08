import { block } from 'bem-cn';
import * as React from 'react';
import './ClientPage.scss';
import { Avatar, Spin, Result, Tag, Divider, Table } from 'antd';
import { fetchClient, fetchClientBonuses } from '../../api/routes';
import { useParams } from 'react-router';
import { Client } from '../../models/client';
import Title from 'antd/lib/typography/Title';
import { upperFirst } from 'lodash';
import { Bonus } from '../../models/bonus';
import { ColumnProps } from 'antd/lib/table';
const b = block('ClientPage');

const ClientPage: React.FC = () => {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(true);

    const [client, setClient] = React.useState<Client>();
    const [bonuses, setBonuses] = React.useState<Bonus[]>();

    React.useEffect(() => void preFetchData(), [id]);

    if (!id || typeof id !== 'string') {
        return <Result status={'500'} title={'Something goes wrong'} />;
    }
    const fetchClientInfo = async () => {
        const res = await fetchClientBonuses(id);
        setBonuses(res);
    };

    const fetchBonuses = async () => {
        const res = await fetchClient(id);
        setClient(res);
    };

    const preFetchData = async () => {
        setLoading(true);
        await Promise.all([fetchClientInfo(), fetchBonuses()]);
        setLoading(false);
    };

    if (loading || !client || !bonuses) {
        return (
            <div className={b('loading')}>
                <Spin />
            </div>
        );
    }

    const bonusesDataSource = bonuses.map(item => ({
        key: item.id,
        ...item,
    }));

    const bonusesTableColumn: ColumnProps<Bonus>[] = [
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Date',
            dataIndex: 'create_time',
        },
    ];

    return (
        <div className={b()}>
            <div className="container">
                <div className={b('head')}>
                    <div className={b('user-name')}>
                        <Avatar icon="user" size="large" />
                        <Title style={{ margin: 0, padding: 0, marginLeft: 10 }} level={3}>
                            {upperFirst(client.firstName)} {upperFirst(client.lastName)}
                        </Title>
                    </div>
                    <Tag style={{ fontWeight: 'bold', padding: '3px 10px', cursor: 'pointer' }}>
                        {client.tariffPlan.title}
                    </Tag>
                </div>
                <Divider />
                <br />
                <div className={b('bonuses')}>
                    <Title level={3}>Начисление бонусов</Title>
                    <br />
                    <Table dataSource={bonusesDataSource} columns={bonusesTableColumn} />
                </div>
            </div>
        </div>
    );
};

export default ClientPage;
