export interface Player {
    username: string | undefined;
    ws: WebSocket;
    uuid: string;
    isHost: boolean;
    state?: string;
    gunID?: number;
}