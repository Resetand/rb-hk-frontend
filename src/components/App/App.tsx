import Title from 'antd/lib/typography/Title';
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import './App.scss';
import { Button, Result } from 'antd';

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route path="/about">
                        <div className="container">
                            <Result
                                status="warning"
                                title={<Title level={1}>About</Title>}
                                subTitle={'Page not ready yet to'}
                                extra={[<Button type="primary">Click me</Button>]}
                            />
                        </div>
                    </Route>

                    <Route path="/">
                        <div className="container">
                            <Result
                                status="warning"
                                title={<Title level={1}>Home</Title>}
                                subTitle={'Page not ready yet'}
                                extra={[<Button type="primary">Click me</Button>]}
                            />
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
