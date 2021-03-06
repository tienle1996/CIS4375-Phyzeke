import http from "../http-common";
class AppointmentDataService {
  getAll() {
    return http.get("/appointments");
  }
  get(id) {
    return http.get(`/appointments/${id}`);
  }
  create(data) {
    return http.post("/appointments", data);
  }
  update(id, data) {
    return http.put(`/appointments/${id}`, data);
  }
  delete(id) {
    return http.delete(`/appointments/${id}`);
  }
  deleteAll() {
    return http.delete(`/appointments`);
  }
  findByTrainerFirstName(TrainerFirstName) {
    return http.get(`/appointments/TrainerFirstName?TrainerFirstName=${TrainerFirstName}`);
  }
  findByLastWeek(){
    return http.get('/appointments/LastWeek');
  }
  findByLastMonth(){
    return http.get('/appointments/LastMonth');
  }
  findByLastYear(){
    return http.get('/appointments/LastYear');
  }
}
export default new AppointmentDataService();