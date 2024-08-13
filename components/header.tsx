import { changeRepos, fetchRepositories } from '@/lib/reducers/repos'
import { ChangeEvent, FC, FormEvent } from 'react'
import { useAppDispatch } from '@/lib/store'

type HeaderProps = {
    searchInput: string
    setSearchInput: React.Dispatch<React.SetStateAction<string>>
}

const Header: FC<HeaderProps> = ({
    searchInput,
    setSearchInput,
}) => {
    const dispatch = useAppDispatch()

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) changeRepos([])
        setSearchInput(e.target.value)
    }
    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await dispatch(fetchRepositories(searchInput))
    }

    return <header className="py-[19px] px-8 h-full max-h-[--header-height] w-full bg-[--primary-color]">
        <form onSubmit={submitHandler} className="h-full flex items-center gap-2">
            <input
                type="text"
                placeholder="Введите поисковый запрос"
                value={searchInput}
                onChange={inputChangeHandler}
                className="font-medium h-full max-w-[912px] w-full px-4 rounded placeholder:italic text-sm"
            />
            <button type="submit" className="h-full px-[22px] py-2 font-medium uppercase text-sm text-white rounded bg-[--blue-color]">
                Искать
            </button>
        </form>
    </header>
}

export default Header
