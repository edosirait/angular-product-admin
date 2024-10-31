import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export function debounceFilter(func: (value: any) => void, delay: number) {
  const subject = new Subject<any>();
  subject.pipe(debounceTime(delay)).subscribe(func);
  return (value: any) => subject.next(value);
}
