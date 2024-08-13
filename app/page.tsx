'use client'

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { changeChoosenRepo, changeShownRepos } from "@/lib/reducers/repos";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

// Конкретное количество строк репозиториев на странице
// Не стал делать выбор количества, так как нужно делать адаптив, а мне лень :)
const reposPerPage = 8

export default function Home() {
    const {
        shownRepos,
        repos: findedRepos,
        status: reposStatus,
        choosenRepo,
        error: repoError
    } = useAppSelector(state => state.repos)
    const dispatch = useAppDispatch()

    const [searchInput, setSearchInput] = useState<string>('')
    const [currentPage, setCurrentPage] = useState(0)
    const [filterType, setFilterType] = useState('none')

    const filterRepos = (type: string) => {
        setFilterType(type)

        switch (type) {
            case 'forks':
                dispatch(changeShownRepos([...findedRepos].sort((repo, nextRepo) => nextRepo.forks_count - repo.forks_count).slice(currentPage * reposPerPage, (currentPage + 1) * reposPerPage)))
                break
            case 'stars':
                dispatch(changeShownRepos([...findedRepos].sort((repo, nextRepo) => nextRepo.stargazers_count - repo.stargazers_count).slice(currentPage * reposPerPage, (currentPage + 1) * reposPerPage)))
                break
            case 'date':
                dispatch(changeShownRepos([...findedRepos].sort((repo, nextRepo) => new Date(nextRepo.updated_at).getTime() - new Date(repo.updated_at).getTime()).slice(currentPage * reposPerPage, (currentPage + 1) * reposPerPage)))
                break
            default:
                dispatch(changeShownRepos([...findedRepos].slice(currentPage * reposPerPage, (currentPage + 1) * reposPerPage)))
                break
        }
    }

    useEffect(() => {
        if (!!findedRepos.length) filterRepos(filterType)
    }, [currentPage])

    const formatDate = (updated_at: string) => new Date(updated_at).toLocaleDateString('ru', { day: "2-digit", month: '2-digit', year: '2-digit' })

    return (
        <>
            <Header
                searchInput={searchInput}
                setSearchInput={setSearchInput}
            />

            <main className="flex items-center justify-center h-[calc(100dvh-var(--header-height))] w-full">
                {reposStatus == 'pending' ? <span className="loader" />
                    : !searchInput || !shownRepos.length || reposStatus == 'rejected' ? (
                        <span className="text-[46px] text-[--gray-color-300]">
                            {reposStatus == 'rejected'
                                ? repoError
                                : 'Добро пожаловать'}
                        </span>
                    ) : (
                        <div className="relative h-full w-full flex">
                            <div className="flex flex-col h-full w-full">
                                <section className="h-full w-full pl-8 pr-4 py-6">
                                    <h2 className="">
                                        Результаты поиска
                                    </h2>
                                    <table className="text-left w-full">
                                        <thead>
                                            <tr>
                                                <th scope="col">Название</th>
                                                <th scope="col">Язык</th>
                                                <th className="cursor-pointer" onClick={() => {
                                                    filterRepos('forks')
                                                    setCurrentPage(0)
                                                }} scope="col">Число форков</th>
                                                <th className="cursor-pointer" onClick={() => {
                                                    filterRepos('stars')
                                                    setCurrentPage(0)
                                                }} scope="col">Число звезд</th>
                                                <th className="cursor-pointer" onClick={() => {
                                                    filterRepos('date')
                                                    setCurrentPage(0)
                                                }} scope="col">Дата обновления</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {shownRepos.map((repo) => (
                                                <tr key={repo.id} onClick={() => dispatch(changeChoosenRepo(repo))}>
                                                    <th scope="row">{repo.full_name}</th>
                                                    <td>{repo.language}</td>
                                                    <td>{repo.forks_count}</td>
                                                    <td>{repo.stargazers_count}</td>
                                                    <td>{formatDate(repo.updated_at)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </section>
                                <div className="w-full py-0.5 flex items-center justify-end gap-[26px]">
                                    <p className="text-sm">
                                        {currentPage * reposPerPage}-{(currentPage + 1) * reposPerPage} of {(Math.ceil(findedRepos.length / reposPerPage) * reposPerPage)}
                                    </p>
                                    <div>
                                        <button
                                            className="p-3"
                                            onClick={() => setCurrentPage(prev => {
                                                if (prev == 0) return prev
                                                return prev - 1
                                            })}
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.705 7.41L14.295 6L8.29504 12L14.295 18L15.705 16.59L11.125 12L15.705 7.41Z" fill="black" fillOpacity="0.56" />
                                            </svg>
                                        </button>
                                        <button
                                            className="p-3"
                                            onClick={() => setCurrentPage(prev => {
                                                if (prev + 1 == Math.ceil(findedRepos.length / reposPerPage)) return prev
                                                return prev + 1
                                            })}
                                        >
                                            <svg className="rotate-180" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.705 7.41L14.295 6L8.29504 12L14.295 18L15.705 16.59L11.125 12L15.705 7.41Z" fill="black" fillOpacity="0.56" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Sidebar choosenRepo={choosenRepo} />
                        </div>
                    )}
            </main >
        </>
    );
}
