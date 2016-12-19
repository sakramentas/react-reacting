import * as PlayerActionTypes from '../actiontypes/player';

const initialState = [
    {
        name: "Lucas Sacramento",
        score: 98,
        id: 1
    },
    {
        name: "Olivia Walthew",
        score: 60,
        id: 2
    },
    {
        name: "Jayro Tavora",
        score: 30,
        id: 3
    },
    {
        name: "Bruno",
        score: 46,
        id: 4
    },
    {
        name: "Brendan Lawlor",
        score: 4,
        id: 5
    }
];

export default function Player(state=initialState, action) {
    switch (action.type) {
        case PlayerActionTypes.ADD_PLAYER:
            return [
                ...state
                {
                    name: action.name,
                    score: 0
                }
            ];

        case PlayerActionTypes.REMOVE_PLAYER:
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ];

        case PlayerActionTypes.UPDATE_PLAYER_SCORE:
            return state.map((player, index) => {
                if(index === action.index) {
                    return {
                        ...player,
                        score: player.score + action.score
                    };
                }
                return player;
            });

        default:
            return state;
    }
}