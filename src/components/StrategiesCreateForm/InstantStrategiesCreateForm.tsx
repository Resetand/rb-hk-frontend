import { Button, Form, Input, Tag, Switch, Icon, InputNumber, Slider } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { block } from 'bem-cn';
import * as React from 'react';
import './InstantStrategiesCreateForm.scss';
import { InstantAmountInterval, StrategyType } from '../../models/strategy';
import Title from 'antd/lib/typography/Title';
import { createStrategy } from '../../api/routes';
const b = block('StrategiesCreateForm');

interface FormProps extends FormComponentProps {}

interface AmountInterval extends InstantAmountInterval {
    key: number;
}

let id = 0;

const StrategiesCreateForm: React.FC<FormProps> = ({ form }) => {
    const handleSubmit: React.FormEventHandler = e => {
        e.preventDefault();

        form.validateFields(err => {
            if (!err) {
                const values = form.getFieldsValue();
                createStrategy({
                    type: StrategyType.INSTANT,
                    title: values.title,
                    settings: {
                        intervals,
                        mссList,
                        maxBonus: values.max,
                        minBonus: values.min,
                    },
                });
            }
        });
    };

    const [mссList, setMссList] = React.useState<string[]>([]);
    const [intervals, setIntervals] = React.useState<AmountInterval[]>([{ key: 0 }]);
    const [enableMссList, setEnableMссList] = React.useState(false);

    const formItemLayout = {
        labelCol: {
            xs: { span: 8 },
            sm: { span: 2 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const handleClose = (removed: string) => {
        setMссList(prev => prev.filter(item => item !== removed));
    };

    const addMсс = () => {
        const Mсс = form.getFieldValue('Mсс') as any;
        if (/\d{4}/.test(Mсс)) setMссList(prev => [...prev, Mсс]);
    };

    const renderMСС = () => {
        return (
            <>
                {form.getFieldDecorator('Mсс', {
                    rules: [
                        {
                            required: true,
                            message: 'Please input a title',
                        },
                        {
                            pattern: /\d/,
                        },
                    ],
                })(
                    <Input
                        addonAfter={
                            <span onClick={addMсс} style={{ cursor: 'pointer' }}>
                                <Icon type="plus" />
                            </span>
                        }
                        placeholder={'3522'}
                        style={{ maxWidth: 100 }}
                    />,
                )}
                <br />

                {mссList.map((item, index) => (
                    <Tag key={item} closable onClose={() => handleClose(item)}>
                        {item}
                    </Tag>
                ))}
            </>
        );
    };

    const intervalsList = intervals.map((interval, i) => {
        const prevInterval = intervals[i - 1];

        const onRemove = () => {
            if (intervals.length > 1) {
                removeInterval(interval.key);
            }
        };
        return (
            <Interval
                setIntervalValues={(values: Partial<AmountInterval>) =>
                    setIntervalValues(interval.key, values)
                }
                minFrom={prevInterval && prevInterval.to ? prevInterval.to : 0}
                onRemove={onRemove}
                key={interval.key}
            />
        );
    });

    const setIntervalValues = (k: number, values: Partial<AmountInterval>) => {
        const thatInterval = intervals.filter(({ key }) => key === k)[0];
        const thisIndex = intervals.indexOf(thatInterval);
        setIntervals(all => [
            ...all.slice(0, thisIndex),
            { ...thatInterval, ...values },
            ...all.splice(thisIndex + 1),
        ]);
    };

    const removeInterval = (k: number) => {
        setIntervals(prev => prev.filter(({ key }) => key !== k));
    };
    const addInterval = () => {
        const prevInterval = intervals[intervals.length - 1];
        setIntervals(prev => [...prev, { from: prevInterval.to, key: ++id }]);
    };

    return (
        <div className={b()}>
            <Form {...formItemLayout} onSubmit={handleSubmit}>
                <Form.Item wrapperCol={{ offset: 2 }} label={'MCC'}>
                    {renderMСС()}
                </Form.Item>

                <Form.Item required label="Title">
                    {form.getFieldDecorator('title')(
                        <Input placeholder={'Daily Ashan strategy'} />,
                    )}
                </Form.Item>
                <Form.Item label={'limit'}>
                    <div className="inline-flex">
                        <Form.Item>
                            {form.getFieldDecorator('from')(<InputNumber placeholder={'Min'} />)}
                        </Form.Item>
                        <Form.Item>-</Form.Item>
                        <Form.Item>
                            {form.getFieldDecorator('to')(<InputNumber placeholder={'Max'} />)}
                        </Form.Item>
                    </div>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 2 }}>
                    <Title level={4}>Intervals calculation</Title>
                </Form.Item>
                {intervalsList}
                <Form.Item wrapperCol={{ offset: 2 }}>
                    <Button onClick={addInterval} type="dashed">
                        Add interval <Icon type="plus" />
                    </Button>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 2 }}>
                    <Button htmlType={'submit'} type="primary">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

interface IntervalProps {
    key: number;
    onRemove: () => void;
    minFrom: number;
    setIntervalValues: (values: Partial<AmountInterval>) => void;
}

const Interval: React.FC<IntervalProps> = ({ key, onRemove, setIntervalValues, minFrom }) => {
    const [ratioMode, setRatioMode] = React.useState(true);

    const [toCurrent, setToCurrent] = React.useState(minFrom + 1000);
    return (
        <Form.Item key={key} className="inline-flex" wrapperCol={{ offset: 2 }}>
            <div className="inline-flex">
                <Form.Item style={{ width: '200px' }}>
                    Fixed amount
                    <Switch
                        onChange={() => setRatioMode(!ratioMode)}
                        checked={!ratioMode}
                        style={{ marginLeft: 20 }}
                    />
                </Form.Item>

                <Form.Item>
                    <InputNumber
                        min={minFrom}
                        onChange={v => {
                            setToCurrent(v!);
                            setIntervalValues({ from: v! });
                        }}
                        placeholder={'Min'}
                    />
                </Form.Item>
                <Form.Item>-</Form.Item>
                <Form.Item>
                    <InputNumber
                        min={toCurrent}
                        onChange={v => setIntervalValues({ to: v! })}
                        placeholder={'Max'}
                    />
                </Form.Item>
                <Form.Item>
                    <span onClick={onRemove} style={{ cursor: 'pointer' }}>
                        <Icon type="delete" />
                    </span>
                </Form.Item>
            </div>
            <Form.Item label={ratioMode ? 'Bonus Presents' : 'Bonus Amount'}>
                {ratioMode ? (
                    <Slider onChange={v => setIntervalValues({ ratio: Number(v) / 100 })} />
                ) : (
                    <InputNumber
                        onChange={v => setIntervalValues({ amount: v })}
                        placeholder={'42'}
                        style={{ width: '100%' }}
                    />
                )}
            </Form.Item>
        </Form.Item>
    );
};

const StrategiesCreateFormWrapped = Form.create({ name: 'create_instant' })(StrategiesCreateForm);

export default StrategiesCreateFormWrapped;
