import { DatePicker, Form, Input, PageHeader } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { block } from 'bem-cn';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import './TariffsCreatePage.scss';

const b = block('TariffsCreatePage');

const TariffsCreatePage: React.FC = () => {
    const history = useHistory();
    const onSubmit: React.FormEventHandler = () => {};
    const [title, setTitle] = React.useState('');
    // const [enableToDate, setEnableToDate] = React.useState(false);
    const [fromDate, setFromDate] = React.useState();
    const formItemLayout = {
        labelCol: {
            xs: { span: 8 },
            sm: { span: 2 },
        },
        wrapperCol: {
            xs: { span: 16 },
            sm: { span: 12 },
        },
    };
    return (
        <div className={b()}>
            <div className="container">
                <PageHeader
                    style={{
                        border: '1px solid rgb(235, 237, 240)',
                        marginBottom: '20px',
                    }}
                    onBack={() => history.push('/tariffs')}
                    title={'Создание тарифа'}
                >
                    <Paragraph style={{ maxWidth: '90%' }}>Тариф - это список стратегий (правил подсчёта бонусов) для конкретного пользователя.</Paragraph>
                </PageHeader>

                <div className="">
                    <Form onSubmit={onSubmit} style={{ marginTop: 60 }} {...formItemLayout}>
                        <Form.Item required label={'Название'}>
                            <Input value={title} onChange={e => setTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item required label={'Начало'}>
                            <DatePicker onChange={setFromDate} value={fromDate} />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default TariffsCreatePage;
