import axios from "axios";
import type { AxiosInstance } from "axios";

export default function fetchNotes() {
  axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
}

export default function createNote() {
  axios
    .post("https://jsonplaceholder.typicode.com/todos")
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
}
const todoId = 1;
export default function deleteNote(todoId: number) {
  axios
    .delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
}
