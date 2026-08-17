import css from "../App/App.module.css";
import { useMutation } from "@tanstack/react-query";

function App() {
  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("");
    },
    onSuccess: (data) => {
      //
    },
  });
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
    </div>
  );
}

export default App;
