import moment from 'moment';

interface IEffortInDate {
  [key: string]: { date: moment.Moment; effort: number };
}

export default class CommonUtil {
  static enumerateDaysBetWeenTwoDates(
    fromDay: moment.Moment,
    toDay: moment.Moment,
  ): IEffortInDate {
    const dates = {};
    const pointer = fromDay;
    while (pointer.isSameOrBefore(toDay.endOf('day'))) {
      const date = pointer.clone();
      dates[date.format('YYYYMMDD')] = {
        date,
        effort: 0,
      };
      pointer.add(1, 'days');
    }
    return dates;
  }

  static countWorkdays(startAt: moment.Moment, endAt: moment.Moment): number {
    const start = moment(startAt);
    const end = moment(endAt);
    let dayCount =
      1 + (end.diff(start, 'days') * 5 - (start.day() - end.day()) * 2) / 7;
    if (end.day() === 6) dayCount--;
    if (start.day() === 0) dayCount--;
    return dayCount;
  }

  static randomNumber(length: number): number {
    let random = '';
    const numbers = '0123456789';
    for (let i = 0; i < length; i++) {
      random += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return Number(random);
  }

  static formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
}
