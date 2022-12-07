export interface Board {
    name: string,
    columns: Array<{
        name: string,
        tasks: Array<{
            title: string,
            description: string,
            status: string,
            subtasks: Array<{
                title: string,
                isCompleted: boolean
            }>
        }>
    }>
}
