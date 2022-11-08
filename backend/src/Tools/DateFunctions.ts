/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
export function getMonthFromString(mon: string) {
  return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
}

export function ExcelDateToJSDate(date: number) {
  return new Date(Math.round((date - 25569) * 86400 * 1000));
}

export function calculate_age(dob) { 
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms); 

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}