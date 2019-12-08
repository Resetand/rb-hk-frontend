import * as React from 'react';
import { TimeUnit } from '../../models/strategy';

const SchedulePicker: React.FC = () => {
    return <h1>asd</h1>;
};

export const useSchedulePicker = () => {
    /*
    fromTime: Date;
    toTime: Date;
    timeUnit: TimeUnit;
    quantity: number;
*/
    const [fromTime, setFromTime] = React.useState(new Date());
    const [toTime, setToTime] = React.useState(new Date());
    const [timeUnit, setTimeUnit] = React.useState<TimeUnit>(TimeUnit.DAYS);
    const [quantity, setQuantity] = React.useState(2);
};

export default SchedulePicker;
