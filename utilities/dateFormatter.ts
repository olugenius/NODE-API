import { format } from "date-fns/format";


export function dateFormatter(date:Date):string{
return format(date,'yyyy-MM-dd')
}

export const isValidDateFormat = (value:string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw new Error('Invalid date format. Date must be in YYYY-MM-DD format');
    }
    return true;
  };