import 'antd/es/calendar/style';

import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generateCalendar from 'antd/es/calendar/generateCalendar';

const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig);

export default Calendar;
