import { ConnectionStates } from "./diagonalConnectionStates";

export const RELATIVE_CORNERS = [
    {
        state: ConnectionStates.southEast,
        offset: { x: 1, y: 0, z: 1 },
        mirrorState: ConnectionStates.northWest,
    },
    {
        state: ConnectionStates.southWest,
        offset: { x: -1, y: 0, z: 1 },
        mirrorState: ConnectionStates.northEast,
    },
    {
        state: ConnectionStates.northWest,
        offset: { x: -1, y: 0, z: -1 },
        mirrorState: ConnectionStates.southEast,
    },
    {
        state: ConnectionStates.northEast,
        offset: { x: 1, y: 0, z: -1 },
        mirrorState: ConnectionStates.southWest,
    },
];
