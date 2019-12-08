import { block } from 'bem-cn';
import * as React from 'react';
import './StrategiesCreatePage.scss';

import { PageHeader, Result, Button } from 'antd';
import { useHistory, Route, Redirect, Switch } from 'react-router-dom';
import Paragraph from 'antd/lib/typography/Paragraph';
import InstantStrategiesCreateForm from '../StrategiesCreateForm/InstantStrategiesCreateForm';
import AggregateStrategiesCreateForm from '../StrategiesCreateForm/AggregateStrategiesCreateForm';
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
                    <Route exact path={'success'}>
                        <Result
                            status={'success'}
                            title="Стратегия успешно создана!"
                            extra={[
                                <Button type="primary" key="list">
                                    К списку
                                </Button>,
                                <Button onClick={() => history.goBack()} key="create">
                                    Создать стратегию
                                </Button>,
                            ]}
                        />
                    </Route>
                    <Route exact path={'/strategies/create/error'}>
                        <Result
                            status={'error'}
                            title="Что-то пошло не так!"
                            extra={[
                                <Button onClick={() => history.goBack()} type="primary" key="list">
                                    Попробовать еще раз
                                </Button>,
                                <Button onClick={() => history.push('/')} key="create">
                                    На главную
                                </Button>,
                            ]}
                        />
                    </Route>
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
