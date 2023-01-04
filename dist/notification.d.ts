type Handler = (...args: any[]) => void;
declare class Notification {
    private handlers;
    constructor();
    private getQueue;
    listen(name: string, handler: Handler): void;
    once(name: string, handler: Handler): void;
    clear(name: string): void;
    dispatch(name: string, ...args: any[]): void;
}
export default Notification;
