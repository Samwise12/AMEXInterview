import { COLORS_ADD } from "../types";

export default function books(state = {}, action = {}) {
  switch (action.type) {
		case COLORS_ADD;
			return action.color;
    default:
      return state;
  }
}

