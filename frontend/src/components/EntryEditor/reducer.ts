import { DateTime } from 'luxon';

export const initialState = {
  editMode: false,
  day: DateTime.now().day,
  goal: '',
  done: '',
  comment: '',
};

export enum Actions {
  RESET,
  EDIT,
  EDIT_DAY,
  EDIT_GOAL,
  EDIT_DONE,
  EDIT_COMMENT,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case Actions.EDIT:
      return {
        ...state,
        edit: true,
        day: action.payload.date,
        goal: action.payload.goal,
        done: action.payload.done,
        comment: action.payload.comment,
      };
    case Actions.RESET:
      return initialState;
    case Actions.EDIT_DAY:
      return { ...state, day: action.payload };
    case Actions.EDIT_GOAL:
      return { ...state, goal: action.payload };
    case Actions.EDIT_DONE:
      return { ...state, done: action.payload };
    case Actions.EDIT_COMMENT:
      return { ...state, comment: action.payload };
    default: {
      return state;
    }
  }
};
