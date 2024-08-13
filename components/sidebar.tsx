import { ReposiroryType } from '@/app/types'
import StarIcon from '@/components/star.icon'
import { FC } from 'react'

const Sidebar: FC<{ choosenRepo: ReposiroryType | null }> = ({
    choosenRepo
}) => {
    return <aside className={`flex items-center justify-center p-6 h-full shrink-0 w-full max-w-[480px] bg-[--gray-color-100]`}>
        {!choosenRepo ? <span className="text-[--gray-color-300] text-sm leading-[20px]">Выберите репозитарий</span>
            : (
                <div className="relative flex flex-col items-baseline h-full w-full">
                    <h3>
                        {choosenRepo?.full_name}
                    </h3>
                    <div className="mb-4">
                        {choosenRepo?.description != null
                            ? <p className="text-sm">
                                {choosenRepo?.description}
                            </p>
                            : <p className="text-sm italic">
                                Описание отсутсвует
                            </p>
                        }
                    </div>
                    <div className="mb-4 w-full flex items-center justify-between">
                        <div className="p-1 bg-[--blue-color] rounded-full">
                            <span className="px-1.5 py-[3px] text-white text-[13px] leading-[18px]">
                                {choosenRepo?.language}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <StarIcon />
                            <span className="text-sm ml-2">
                                {choosenRepo?.stargazers_count}
                            </span>
                        </div>
                    </div>
                    <ul className="flex flex-wrap gap-2 mb-6">
                        <li className="px-1 py-[3px] bg-[rgba(0,0,0,.08)] rounded-full">
                            <span className="px-1.5 text-[13px] leading-[18px]">
                                Python
                            </span>
                        </li>
                    </ul>
                    <div className="text-sm">
                        {choosenRepo?.license != null
                            ? choosenRepo?.license.name
                            : "Лицензия отсутсвует"}
                    </div>
                </div>
            )}
    </aside>
}

export default Sidebar
