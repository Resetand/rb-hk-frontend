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
                                Мгновенная стратегия - это тип начисления бонусов, в котором бонусы
                                высчитываются сразу же для каждой транзакции, которую совершает
                                пользователь. Есть 2 вида мгновенной стратегии: процентная и
                                фиксированная. Проценты и фиксированную сумму бонусов можно гибко
                                настроить, например чем больше сумма покупки — тем больше процент
                                начисления бонусов.
                            </Route>
                            <Route path={'/strategies/create/schedule'}>
                                Агрегационная - это тип начисления бонусов, где количество
                                начисленных бонусов зависит от оборота пользователя за какой-то
                                определённых период времени. Как и в мгновенной стратегии,
                                существует 2 вида этой стратегии: процентная и фиксированная.
                                Например (фиксированная), если за 7 дней пользователь потратил
                                10.000 рублей, то начислить ему 1000 бонусов, если меньше — 100
                                бонусов. В случае процентной стратегии, бонусы бы высчитывались в
                                процентах от оборота.
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
