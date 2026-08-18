import css from "../App/App.module.css";
import { useMutation } from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

function App() {
  //   const mutation = useMutation({
  //     mutationFn: async (data) => {
  //       const res = await axios.post("");
  //     },
  //     onSuccess: (data) => {
  //       //
  //     },
  //   });
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        <SearchBox />
        {/* Пагінація */}
        <Pagination />
        {/* Кнопка створення нотатки */}
        <button className={css.button}>Create note +</button>
      </header>
    </div>
  );
}

export default App;
