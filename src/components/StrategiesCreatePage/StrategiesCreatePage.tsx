import { block } from 'bem-cn';
import * as React from 'react';
import './StrategiesCreatePage.scss';

import { PageHeader } from 'antd';
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
                    title={'Create new strategy'}
                >
                    <Paragraph style={{ maxWidth: '90%' }}>
                        This is an instant strategy - its main task is to start immediately after
                        the transaction, these are the rules by which the client will be credited
                        with his bonuses, for example, for making a purchase in supermarkets more
                        than 3000 rubles
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
