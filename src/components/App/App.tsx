import SearchBox from "../SearchBox/SearchBox"
import ReactPaginate from 'react-paginate';
import NoteList from "../NoteList/NoteList"
import { fetchNotes } from "../../services/noteService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from 'use-debounce';
import { useState } from "react";
import css from './App.module.css'
import styles from '../Pagination/Pagination.module.css'
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ErrorRequest from "../ErrorRequest/ErrorRequest";

function App() {

  const [inputValue, setinputValue] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {data, isSuccess, isLoading, isFetching, isError} = useQuery({
    queryKey: ['tasks', inputValue, page],
    queryFn: () => fetchNotes({ query: inputValue, page: page }),
    placeholderData: keepPreviousData,
  });

  const updateSearchQuery = useDebouncedCallback(
    (searchTopic: string) => {
      {setinputValue(searchTopic)}
    },
    300
  );

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={updateSearchQuery} />
     {isSuccess && totalPages > 0 &&  <ReactPaginate
          pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                nextLabel="→"
                previousLabel="←"
            />}
        <button className={css.button} onClick={openModal}>Create +</button>
      </header>
      
      {isLoading || isFetching ? (
      <Loader />
    ) : isError ? (
      <ErrorMessage />
    ) : data && data.notes.length > 0 ? (
      <NoteList tasks={data.notes} />
    ) : (
      <ErrorRequest />
    )}
      {isModalOpen && <Modal onClose={closeModal} />}
     
      </div>
  )
}

export default App
