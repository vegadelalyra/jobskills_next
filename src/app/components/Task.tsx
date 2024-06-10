'use client'

import React, { FormEventHandler, MouseEventHandler, useState } from 'react'
import { ITask } from '../types/tasks'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Modal from './Modal'
import { useRouter } from 'next/navigation'
import { deleteTodo, editTodo } from '../api'

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter()
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text)

    const openEditModal = () => {
        const modal = document.getElementById(
            `edit_modal_${task.id}`
        ) as HTMLDialogElement | null

        if (modal) modal.showModal()
    }

    const closeEditModal = () => {
        const modal = document.getElementById(
            `edit_modal_${task.id}`
        ) as HTMLDialogElement | null

        if (modal) modal.close()
    }

    const openDeleteModal = () => {
        const modal = document.getElementById(
            `delete_modal_${task.id}`
        ) as HTMLDialogElement | null

        if (modal) modal.showModal()
    }

    const closeDeleteModal: MouseEventHandler<HTMLButtonElement> = e => {
        e.preventDefault()

        const modal = document.getElementById(
            `delete_modal_${task.id}`
        ) as HTMLDialogElement | null
        
        if (modal) modal.close()
    }

    const handleEditTodo: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
        await editTodo({
            id: task.id,
            text: taskToEdit
        })
        closeEditModal()
        router.refresh()
    }

    const handleDeleteTodo: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
        await deleteTodo(task.id)
        closeEditModal()
        router.refresh()
    }

    return (
        <tr key={task.id}>
            <td className='w-full'>{task.text}</td>
            <td className='flex gap-5'>
                <FiEdit
                    onClick={openEditModal}
                    cursor='pointer'
                    className='text-blue-500'
                    size={25}
                />
                <Modal modalId={`edit_modal_${task.id}`}>
                    <form onSubmit={handleEditTodo}>
                        <h3 className='text-lg font-bold'>Edit task</h3>
                        <div className='modal-action'>
                            <input
                                value={taskToEdit}
                                onChange={e => setTaskToEdit(e.target.value)}
                                type='text'
                                placeholder='Type here'
                                className='input input-bordered w-full'
                            />
                            <button type='submit' className='btn'>
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2
                    onClick={openDeleteModal}
                    cursor='pointer'
                    className='text-red-500'
                    size={25}
                />
                <Modal modalId={`delete_modal_${task.id}`}>
                    <form onSubmit={handleDeleteTodo}>
                        <h3 className='text-lg font-bold'>Delete task ?</h3>
                        <div className='modal-action'>
                            <button type='submit' className='btn'>
                                Yes
                            </button>
                            <button onClick={closeDeleteModal} className='btn'>
                                No
                            </button>
                        </div>
                    </form>
                </Modal>
            </td>
        </tr>
    )
}

export default Task
