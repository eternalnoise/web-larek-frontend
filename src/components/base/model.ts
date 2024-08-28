import { IEvents } from '../../types/types';

export abstract class BaseModel<T> {
  constructor (data: Partial<T>, protected events: IEvents) {
    Object.assign(this, data);
  }
  emitChanges(event: string, data?: object){
    this.events.emit(event, data ?? {});
  }
}
