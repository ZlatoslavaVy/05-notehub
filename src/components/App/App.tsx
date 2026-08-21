import { useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { createNote, deleteNote, fetchNotes } from "../../services/noteService";
import type { NewNote } from "../../types/note";

import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import css from "./App.module.css";

export default function App() {
  const [queryInput, setQueryInput] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  // Відкладений пошук за допомогою use-debounce в App
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setQueryInput(value);
    debouncedSearch(value);
  };

  // Запит на отримання нотаток
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", search, currentPage],
    queryFn: () => fetchNotes({ page: currentPage, perPage: 12, search }),
    placeholderData: keepPreviousData,
  });

  // Мутація на створення нотатки
  const createMutation = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
  });

  // Мутація на видалення нотатки
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={queryInput} onChange={handleSearchChange} />

        {/* Пагінація рендериться лише якщо сторінок більше 1 */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {/* Індикатори завантаження та помилки */}
      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong. Please try again later.</p>}

      {/* Список рендериться лише якщо є хоча б один елемент */}
      {notes.length > 0 && (
        <NoteList
          notes={notes}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      )}

      {/* Модальне вікно для створення нотатки */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={(newNote) => createMutation.mutate(newNote)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}