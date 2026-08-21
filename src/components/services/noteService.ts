import axios from "axios";
import type {Note} from "../../types/note"


const BASE_URL = import.meta.env.VITE_NOTEHUB_TOKEN;

export const PER_PAGE = 12;

export interface fetchNotesProps {
  page: number;
}
export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
}
export const fetchNotes = async (title = ""): Promise<Note[]> => {
    const response = await axios.get<Note[]>(`${BASE_URL}/notes`, {
        params: (title),
    });
    return response.data
}

// export default function fetchNotes({ page }: fetchNotesProps) {
//   axios
//     .get("https://jsonplaceholder.typicode.com/todos")
//     .then((response) => console.log(response.data))
//     .catch((error) => console.log(error));
// }

// export default function createNote() {
//   axios
//     .post("https://jsonplaceholder.typicode.com/todos")
//     .then((response) => console.log(response.data))
//     .catch((error) => console.log(error));
// }
// const todoId = 1;
// export default function deleteNote(todoId: number) {
//   axios
//     .delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
//     .then((response) => console.log(response.data))
//     .catch((error) => console.log(error));
// }
