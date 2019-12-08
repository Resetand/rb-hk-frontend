import { Button, Icon, Table } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { ColumnProps } from 'antd/lib/table';
import Title from 'antd/lib/typography/Title';
import { block } from 'bem-cn';
import * as React from 'react';
import { fetchStrategies } from '../../api/routes';
import { Strategy } from '../../models/strategy';
import './StrategiesListPage.scss';
const b = block('StrategiesListPage');

const StrategiesListPage: React.FC = () => {
    const [strategiesList, setStrategiesList] = React.useState<Strategy[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        fetchStrategies()
            .then(setStrategiesList)
            .finally(() => setLoading(false));
    }, []);

    const dataSource = strategiesList.map(item => ({
        key: item.title,
        ...item,
    }));

    const columns: ColumnProps<Strategy>[] = [
        {
            title: 'Название',
            dataIndex: 'title',
        },
    ];
    return (
        <div className={b()}>
            <div className="container">
                <div className={b('head')}>
                    <Title level={2}>Стратегии</Title>
                    <ButtonGroup>
                        <Button href="/strategies/create/instant">
                            <Icon type="thunderbolt" /> Создать мгновенную стратегию
                        </Button>
                        <Button href="/strategies/create/schedule">
                            <Icon type="schedule" /> Создать агрегационную стратегию
                        </Button>
                    </ButtonGroup>
                </div>

                <div className="list">
                    <Table loading={loading} columns={columns} dataSource={dataSource}></Table>
                </div>
            </div>
        </div>
    );
};

export default StrategiesListPage;
