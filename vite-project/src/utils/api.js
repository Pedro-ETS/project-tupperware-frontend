import Api from "../components/Api/Api";
const token = localStorage.getItem("token");
const api = new Api({
  address: "http://localhost:3000/",
  token: token,
});
export default api;