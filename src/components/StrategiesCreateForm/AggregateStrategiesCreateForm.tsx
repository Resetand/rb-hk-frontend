import * as React from 'react';

import Form, { FormComponentProps } from 'antd/lib/form';

interface FormProps extends FormComponentProps {}

const AggregateStrategiesCreateForm: React.FC<FormProps> = ({ form }) => {
    return <h1>AggregateStrategiesCreateForm</h1>;
};

const AggregateStrategiesCreateFormWrapped = Form.create({ name: 'create_instant' })(
    AggregateStrategiesCreateForm,
);

export default AggregateStrategiesCreateFormWrapped;
