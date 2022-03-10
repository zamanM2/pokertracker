export function dateCompare(a, b) {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
}

export function nameCompare(a, b) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
}

export function earningsCompare(a, b) {
  if (a.earnings < b.earnings) {
    return 1;
  }
  if (a.earnings > b.earnings) {
    return -1;
  }
  return 0;
}

export const getTodaysDate = () => {
  let todaysDate = new Date();
  const offset = todaysDate.getTimezoneOffset();
  todaysDate = new Date(todaysDate.getTime() - offset * 60 * 1000);
  return todaysDate.toISOString().split("T")[0]; //yyyy-mm-dd
};