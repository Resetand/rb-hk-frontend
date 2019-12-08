import { Button, Result } from 'antd';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientPage from '../ClientPage/ClientPage';
import ClientsListPage from '../ClientsListPage/ClientsListPage';
import Header from '../Header/Header';
import StrategiesCreatePage from '../StrategiesCreatePage/StrategiesCreatePage';
import StrategiesListPage from '../StrategiesListPage/StrategiesListPage';
import './App.scss';
import TariffsPage from '../TariffsPage/TariffsPage';

const App: React.FC = () => {
    const renderError = () => (
        <Result
            status={'404'}
            title={'404'}
            subTitle={'Page not found'}
            extra={[
                <Button type={'primary'} href={'/'}>
                    Go to the home page
                </Button>,
            ]}
        />
    );
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={ClientsListPage} />
                    <Route exact path="/strategies" component={StrategiesListPage} />
                    <Route path="/strategies/create" component={StrategiesCreatePage} />
                    <Route exact path="/client/:id" component={ClientPage} />
                    <Route exact path="/client/:id" component={TariffsPage} />

                    <Route children={renderError()} />
                </Switch>
            </Router>
        </div>
    );
};

/*
    icon?: React.ReactNode;
    status?: ResultStatusType;
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    extra?: React.ReactNode;
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
*/

export default App;
