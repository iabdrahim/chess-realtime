export interface IPlayers {
  white: {
    id: string | null;
    loot: never[] | { name: string }[];
  };
  black: {
    id: string | null;
    loot: never[] | { name: string }[];
  };
}
export interface IBoard {
  name: string;
}

const initialState = {
  message: null,
};
