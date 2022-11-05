type Handler = (...args: any[]) => void;

class Notification {
  private handlers: Map<string, Handler[]>;

  constructor() {
    this.handlers = new Map();
  }

  private getQueue(name: string) {
    const queue = this.handlers.get(name);

    if (!queue) {
      this.handlers.set(name, []);

      return [];
    } else {
      return queue;
    }
  }

  listen(name: string, handler: Handler) {
    const queue = this.getQueue(name);

    this.handlers.set(name, queue.concat(handler));
  }

  once(name: string, handler: Handler) {
    this.handlers.set(name, [handler]);
  }

  clear(name: string) {
    this.handlers.set(name, []);
  }

  dispatch(name: string, ...args: any[]) {
    const queue = this.getQueue(name);

    queue.forEach(fn => fn(...args));

    this.clear(name);
  }
}

export default Notification;
