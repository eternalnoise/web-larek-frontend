abstract class BaseModel {
  constructor (data: Partial<T>, protected events: IEvents) {
    emitChanges(event: string, data?: object);
  }
}