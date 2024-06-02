import axios from "axios";
import { Tasks } from "../Tasks";

const baseUrl = "https://localhost:7258/api/TaskList";

export class TaskService {
  static GetAllTaskList = () => {
    return axios.post<Tasks[]>(`${baseUrl}/GetAllTaskList`);
};

static AddTask = (task: Tasks) => {
    return axios.post<Tasks>(`${baseUrl}/AddTask`, task);
};

  static UpdateTask = (id: string, taskUpdateDto: Tasks) => {
    return axios.put<Tasks>(`${baseUrl}/UpdateTask/${id}`, taskUpdateDto);
};

  static DeleteTask = (id: string) => {
    return axios.delete(`${baseUrl}/${id}`);
  };

}