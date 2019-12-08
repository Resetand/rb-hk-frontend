import {
    Button,
    Form,
    Input,
    Tag,
    Switch,
    Icon,
    InputNumber,
    Slider,
    DatePicker,
    Select,
} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { block } from 'bem-cn';
import * as React from 'react';
import './InstantStrategiesCreateForm.scss';
import { IntervalSettings, StrategyType, TimeUnit } from '../../models/strategy';
import Title from 'antd/lib/typography/Title';
import { createStrategy } from '../../api/routes';
import { useHistory } from 'react-router';
const b = block('InstantStrategiesCreateForm');

interface FormProps extends FormComponentProps {}

interface AmountInterval extends IntervalSettings {
    key: number;
}

let id = 0;

const StrategiesCreateForm: React.FC<FormProps> = ({ form }) => {
    const history = useHistory();
    const handleSubmit: React.FormEventHandler = e => {
        e.preventDefault();

        form.validateFields(async err => {
            if (!err) {
                const values = form.getFieldsValue();
                try {
                    await createStrategy({
                        type: StrategyType.AGGREGATE_DATE,
                        title: values.title,
                        settings: {
                            intervals: intervals.map(i => ({ ...i, key: undefined })),
                            mcc_list: mссList,
                            max_bonus: values.max,
                            min_bonus: values.min,
                            aggregate_time_settings: {
                                to_time: values.toTime,
                                from_time: values.fromTime,
                                time_unit: values.timeUnit,
                                quantity: values.quantity,
                            },
                        },
                    });
                    history.push('/strategies/create/success');
                } catch (error) {
                    console.log(error);
                    // history.push('/strategies/create/error');
                }
            }
        });
    };

    const [mссList, setMссList] = React.useState<string[]>([]);
    const [intervals, setIntervals] = React.useState<AmountInterval[]>([{ key: 0 }]);

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
        const mcc = form.getFieldValue('mсс') as any;
        form.resetFields(['mcc']);
        if (/\d{4}/.test(mcc)) setMссList(prev => [...prev, mcc]);
    };

    const renderMСС = () => {
        return (
            <>
                {form.getFieldDecorator('mсс', { rules: [{ pattern: /\d/ }] })(
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

                <Form.Item label={''} wrapperCol={{ offset: 2 }}>
                    <div className="inline-flex">
                        <Form.Item required label={'Начать с'}>
                            {form.getFieldDecorator('fromTime')(<DatePicker />)}
                        </Form.Item>
                        <Form.Item label={'Закончить'}>
                            {form.getFieldDecorator('toTime')(<DatePicker />)}
                        </Form.Item>
                        <Form.Item label={'Кол-во'}>
                            {form.getFieldDecorator('quantity')(<InputNumber />)}
                        </Form.Item>
                        <Form.Item label={'Период'}>
                            {form.getFieldDecorator('timeUnit')(
                                <Select style={{ width: 100 }}>
                                    {Object.keys(TimeUnit).map(tu => (
                                        <Select.Option
                                            key={TimeUnit[tu as TimeUnit]}
                                            value={TimeUnit[tu as TimeUnit]}
                                        >
                                            {String(TimeUnit[tu as TimeUnit])}
                                        </Select.Option>
                                    ))}
                                </Select>,
                            )}
                        </Form.Item>
                    </div>
                </Form.Item>
                <Form.Item required label="Название">
                    {form.getFieldDecorator('title')(
                        <Input placeholder={'Daily Ashan strategy'} />,
                    )}
                </Form.Item>
                <Form.Item label={'Лимит'}>
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
                    <Title level={4}>Правила начисления</Title>
                </Form.Item>
                {intervalsList}
                <Form.Item wrapperCol={{ offset: 2 }}>
                    <Button style={{ marginRight: 30 }} htmlType={'submit'} type="primary">
                        Создать
                    </Button>
                    <Button onClick={addInterval} type="dashed">
                        Добивить правило <Icon type="plus" />
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
                    Фиксированное
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
            <Form.Item label={ratioMode ? 'Бонусы в процентах' : 'Фиксированное количество'}>
                {ratioMode ? (
                    <Slider onChange={v => setIntervalValues({ ratio: Number(v) / 100 })} />
                ) : (
                    <InputNumber
                        onChange={v => setIntervalValues({ amount: v })}
                        placeholder={'42'}
                        style={{ width: '100%' }}
                        min={0}
                    />
                )}
            </Form.Item>
        </Form.Item>
    );
};

const StrategiesCreateFormWrapped = Form.create({ name: 'create_instant' })(StrategiesCreateForm);

export default StrategiesCreateFormWrapped;
