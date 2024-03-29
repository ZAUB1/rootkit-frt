export const COMP_EVENTS: string[] = [ "@click" ];

export default class EventEmitter {
    private _events: Map<string, Function[]> = new Map();

    public on(name: string, cb: Function) {
        const event = this._events.get(name);
        if (!event) {
            this._events.set(name, [cb]);
            return false;
        }
        event.push(cb);
        return true;
    };

    public emit(name: string, ..._: any) {
        const event = this._events.get(name);
        if (!event)
            return false;
        event.map(cb => cb(..._));
        return true;
    };
}