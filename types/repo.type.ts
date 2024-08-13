
// Тип репозитория с основными используемыми полями
export type ReposiroryType = {
    id: number
    node_id: string
    name: string
    full_name: string
    language: string
    updated_at: string
    license: {
        key: string
        name: string
        spdx_id: string
        url: string | null,
        node_id: string
    } | null
    description: string | null
    forks_count: number
    stargazers_count: number
}
