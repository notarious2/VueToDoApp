export default function refreshHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user["refresh_token"]) {
    return { Authorization: "Bearer " + user.refresh_token };
  } else {
    return {};
  }
}
