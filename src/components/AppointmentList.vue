<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by Trainer First Name"
          v-model="TrainerFirstName"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTrainerFirstName">
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-8">
        <label>Appointments in the last: </label>
    </div>
    <div class="col-md-8">
            <div class="input-group mb-3">
                <!-- Search Clients by status -->
                <select v-model="history">
                    <option disabled value="">Please select one</option>
                    <option>Week</option>
                    <option>Month</option>
                    <option>Year</option>
                </select>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchAppointmentHistory">
                        Search
                    </button>
                </div>
            </div>
        </div>
    <div class="col-md-6">
      <h4>Appointment List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(appointment, index) in appointments"
          :key="index"
          @click="setActiveAppointment(appointment, index)">
       {{"Trainer: " +appointment.trainers.TrainerFirstName + " "+ appointment.trainers.TrainerLastName}}
       <br>
        {{ "Date: " + appointment.AppointmentDate }}

        </li>
        {{"Total Appointments: " + appointments.length}}
      </ul>
      <button class="m-3 btn btn-sm btn-info" @click="refreshList">
        Refresh List
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentAppointment">
        <h4>Appointments</h4>
        <div>
          <label><strong>Trainer First Name:</strong></label> 
          {{ currentAppointment.trainers.TrainerFirstName }}
        </div>
                <div>
          <label><strong>Trainer Last Name:</strong></label> 
          {{ currentAppointment.trainers.TrainerLastName }}
        </div>
        <div>
          <label><strong>Client First Name:</strong></label> 
          {{ currentAppointment.clients.ClientFirstName }}
        </div>
          <div>
          <label><strong>Client Last Name:</strong></label> 
          {{ currentAppointment.clients.ClientLastName }}
        </div>
        <div>
          <label><strong>Training Detail:</strong></label> 
          {{ currentAppointment.trainingdetail.TrainingDescription }}
        </div>
        <div>
          <label><strong>Appointment Date: </strong></label>
          {{ currentAppointment.AppointmentDate }}
        </div>
        <div>
          <label><strong>Appointment Time: </strong></label>
          {{ currentAppointment.AppointmentDuration }}
        </div>
        <div>
          <label><strong>Appointment Location:</strong></label>
          {{ currentAppointment.AppointmentLocation }}
        </div>
        <div>
          <label><strong>Log:</strong></label> {{ currentAppointment.Notes }}
        </div>
        <router-link
          :to="'/appointments/' + currentAppointment.AppointmentID"
          class="badge badge-warning"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Trainer...</p>
      </div>
    </div>
  </div>
</template>
<script>
import AppointmentDataService from "../services/AppointmentDataService";
export default {
  name: "appointments-list",
  data() {
    return {
      appointments: [],
      currentAppointment: null,
      currentIndex: -1,
      TrainerFirstName: "",
      history: ""
    };
  },
  methods: {
    retrieveAppointments() {
      AppointmentDataService.getAll()
        .then((response) => {
          this.appointments = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveAppointments();
      this.currentAppointment = null;
      this.currentIndex = -1;
    },
    setActiveAppointment(appointment, index) {
      this.currentAppointment = appointment;
      this.currentIndex = appointment ? index : -1;
    },
    removeAllAppointments() {
      AppointmentDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchTrainerFirstName() {
      AppointmentDataService.findByTrainerFirstName(this.TrainerFirstName)
        .then((response) => {
          this.appointments = response.data;
          
          this.setActiveAppointment(null);
          console.log(response.data);
          
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchAppointmentHistory() {
      if (this.history == "Week"){
        AppointmentDataService.findByLastWeek()
          .then((response) => {
            this.appointments = response.data;
            this.setActiveAppointment(null);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } 
      else if (this.history == "Month"){
        AppointmentDataService.findByLastMonth()
          .then((response) => {
            this.appointments = response.data;
            this.setActiveAppointment(null);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } 
      else if (this.history == "Year"){
        AppointmentDataService.findByLastYear()
          .then((response) => {
            this.appointments = response.data;
            this.setActiveAppointment(null);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } 
    },
  },
  mounted() {
    this.retrieveAppointments();
  },
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
