import { format } from "date-fns/format";


export function dateFormatter(date:Date):string{
return format(date,'yyyy-MM-dd')
}