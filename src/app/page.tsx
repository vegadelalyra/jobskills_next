import { getAllTodos } from './api'
import AddTask from './components/AddTask'
import TodoList from './components/TodoList'

export default async function Home() {
    const tasks = await getAllTodos()
    
    return (
        <main className='mx-auto mt-4 max-w-4xl mx-8 mt-12'>
            <div className='my-5 flex flex-col gap-4 text-center'>
                <h1 className='text-2xl font-bold'>Todo List App</h1>
                <AddTask />
            </div>
            <TodoList tasks={tasks} />
        </main>
    )
}
