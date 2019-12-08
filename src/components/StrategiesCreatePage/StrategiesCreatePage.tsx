import { PageHeader } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { block } from 'bem-cn';
import * as React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import AggregateStrategiesCreateForm from '../StrategiesCreateForm/AggregateStrategiesCreateForm';
import InstantStrategiesCreateForm from '../StrategiesCreateForm/InstantStrategiesCreateForm';
import './StrategiesCreatePage.scss';

const b = block('StrategiesCreatePage');

const StrategiesCreatePage: React.FC = () => {
    const history = useHistory();
    return (
        <div className={b()}>
            <div className="container">
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                        marginBottom: '20px',
                    }}
                    onBack={() => history.push('/strategies')}
                    title={'Создание стратегии'}
                >
                    <Paragraph style={{ maxWidth: '90%' }}>
                        <Switch>
                            <Route path={'/strategies/create/instant'}>
                                Мгновенная стратегия - это ...
                            </Route>
                            <Route path={'/strategies/create/schedule'}>
                                Агрегационная - это ...
                            </Route>
                            <Redirect to={'/'} />
                        </Switch>
                    </Paragraph>
                </PageHeader>

                <Switch>
                    <Route path={'/strategies/create/instant'}>
                        <InstantStrategiesCreateForm />
                    </Route>
                    <Route path={'/strategies/create/schedule'}>
                        <AggregateStrategiesCreateForm />
                    </Route>
                    <Redirect to={'/'} />
                </Switch>
            </div>
        </div>
    );
};

export default StrategiesCreatePage;
