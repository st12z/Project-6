export function LoginReducer(state = false, action) {
  if (action.type == "CheckLogin") {
    return action.status;
  }
  return state;
}
