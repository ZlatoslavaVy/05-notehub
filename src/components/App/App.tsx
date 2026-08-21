import css from "../App/App.module.css";
// import { useMutation } from "@tanstack/react-query";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../services/noteService";
import { useEffect, useState } from "react";
import type { Note } from "../../types/note";
import SearchBox from "../SearchBox/SearchBox";
// import Pagination from "../Pagination/Pagination";
// import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";


function App() {
    const [search, setSearch] = useState("");
     const [currentPage, setCurrentPage] = useState(1);
      const [isModalOpen, setIsModalOpen] = useState(false);
  
      const {data} = useQuery({
        queryKey: ["notes", search, currentPage],
        queryFn: () => fetchNotes({page: currentPage, perPage: 12, search}),
        placeholderData: keepPreviousData,
      })

      const totalPages = data?.totalPages ?? 0;
  const notes: Note[] = data?.notes ?? [];

  const handleSearch = (nextSearch: string) => {
    setSearch(nextSearch);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        <SearchBox defaultValue={search} onSearch={handleSearch} />
        {/* Пагінація */}
        {/* <Pagination /> */}
        <NoteForm />
        <NoteList notes={notes}>
        {/* Кнопка створення нотатки */}
        <button className={css.button}>Create note +</button>
        {/* <Modal></Modal> */}
      </header>
    </div>
  );
}

export default App;
