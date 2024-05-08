import { format } from "date-fns/format";
import { DateTime } from 'luxon';


export function dateFormatter(date:Date):string|boolean{
  try{
    return format(date,'yyyy-MM-dd')
  }catch(err){
  console.log('An error occured formatting date',err)
  return false
  }

}

export const isValidDateFormat = (value:string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw new Error('Invalid date format. Date must be in YYYY-MM-DD format');
    }
    return true;
  };

  export const isAtLeast16YearsOld = (value:string) => {
    const dob = DateTime.fromISO(value);
    const today = DateTime.now();
    const age = today.diff(dob, 'years').years;
    return age >= 16;
  };