import SearchBox from "../SearchBox/SearchBox"
import Pagination from "../Pagination/Pagination"
import NoteList from "../NoteList/NoteList"
import { fetchNotes } from "../../services/noteService";
import { useQuery } from "@tanstack/react-query";

function App() {

  const {data} = useQuery({
    queryKey: ['tasks'],
    queryFn: () => fetchNotes({query: undefined as any, page: 1})
  });

  return (
    <>
      <header>
        <SearchBox/>
        <Pagination />
        <button>Click</button>
      </header>
      <NoteList tasks={data?.notes} />
    </>
  )
}

export default App
