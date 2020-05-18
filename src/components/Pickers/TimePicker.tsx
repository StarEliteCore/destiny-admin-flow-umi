import DatePicker from './DatePicker';
import { Dayjs } from 'dayjs';
import { Omit } from 'antd/es/_util/type';
import { PickerTimeProps } from 'antd/es/date-picker/generatePicker';
import React from 'react';

export interface TimePickerProps extends Omit<PickerTimeProps<Dayjs>, 'picker'> {}

const TimePicker = React.forwardRef<any, TimePickerProps>((props, ref) => <DatePicker {...props} picker="time" mode={undefined} ref={ref} />);

TimePicker.displayName = 'TimePicker';

export default TimePicker;
