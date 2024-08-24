class EventEmitter {
  _events: Map<EventName, Set<Subscriber>>;
  on(eventName: EventName, callback: (event: T) => void) {
}

  off(eventName: EventName, callback: Subscriber) {
  }

  emit(eventName: string, data?: T) { 
  }   
  onAll(callback: (event: EmitterEvent) => void) {
  }
  offAll() {
  }

  trigger(eventName: string, context?: Partial) {
  }




}