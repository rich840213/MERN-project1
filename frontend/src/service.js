import axios from "axios";

const baseURL = "http://localhost:8888/api";

class Service {
  createTestData = () => axios.get(baseURL + "/reset");

  getPatients = () => axios.get(baseURL + "/patients");

  getOrders = (id) => axios.get(baseURL + "/orders/" + id);

  updateOrders = (data) => axios.put(baseURL + "/orders", { data });

  deleteOrders = (id) => axios.delete(baseURL + "/orders/" + id);

  deleteAllOrders = () => axios.delete(baseURL + "/orders");
}

export default new Service();
