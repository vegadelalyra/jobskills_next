'use client'

import React, {
    FormEventHandler,
    MouseEventHandler,
    useState,
} from 'react'
import Modal from './Modal'
import { IJobSkill } from '../types/jobSkill'
import { ImPlus } from 'react-icons/im'
import { FaMinus } from 'react-icons/fa'

interface JobSkillProps {
    jobSkill: IJobSkill
    onUpdate: (updatedJobSkill: IJobSkill) => void
    onDelete: (jobSkillId: string) => void
}

const JobSkill: React.FC<JobSkillProps> = ({ jobSkill, onUpdate, onDelete }) => {
    const [taskToEdit, setTaskToEdit] = useState<string>(jobSkill.skill)
    const jobSkillId = String(jobSkill._id)
    const url: string = process.env.NEXT_PUBLIC_JOBSKILLS_API_URL + '/' + jobSkillId

    const openEditModal: MouseEventHandler = () => {
        const modal = document.getElementById(
            `edit_modal_${jobSkillId}`
        ) as HTMLDialogElement | null

        if (modal) modal.showModal()
    }

    const closeEditModal = () => {
        const modal = document.getElementById(
            `edit_modal_${jobSkillId}`
        ) as HTMLDialogElement | null

        if (modal) modal.close()
    }

    const openDeleteModal: MouseEventHandler<HTMLTableRowElement> = e => {
        e.preventDefault()
        const modal = document.getElementById(
            `delete_modal_${jobSkillId}`
        ) as HTMLDialogElement | null

        if (modal) modal.showModal()
    }

    const closeDeleteModal: MouseEventHandler<HTMLButtonElement> = e => {
        if (e) e.preventDefault()

        const modal = document.getElementById(
            `delete_modal_${jobSkillId}`
        ) as HTMLDialogElement | null

        if (modal) modal.close()
    }

    const handleEditTodo: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
       
        try {
            const res = await fetch(url, {
                method: 'PATCH',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ skill: taskToEdit })
            })
            const updatedJobSkill = await res.json()
            onUpdate(updatedJobSkill["updatedFields"])
        } catch (error) {
            console.log(error)
        }

        closeEditModal()
    }

    const handleDeleteTodo: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()

        try {
            await fetch(url, { method: 'DELETE' })
            onDelete(jobSkillId)
        } catch (error) {
            console.log(error)
        }

        const modal = document.getElementById(
            `delete_modal_${jobSkillId}`
        ) as HTMLDialogElement | null

        if (modal) modal.close()
    }

    const handleTaskIncrease: MouseEventHandler<SVGElement> = async () => {
        try {
            const res = await fetch(url, {
                method: 'PATCH',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ asked: jobSkill.asked + 1 })
            })
            const updatedJobSkill = await res.json()
            onUpdate(updatedJobSkill["updatedFields"])
        } catch (error) {
            console.log(error)
        }
    }

    const handleTaskDecrease: MouseEventHandler<SVGElement> = async () => {
        if (jobSkill.asked == 0) return

        try {
            const res = await fetch(url, {
                method: 'PATCH',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ asked: jobSkill.asked - 1 })
            })
            const updatedJobSkill = await res.json()
            onUpdate(updatedJobSkill["updatedFields"])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <tr key={jobSkillId} onContextMenu={openDeleteModal}>
            <td className='w-full'>
                <span onClick={openEditModal} className='cursor-pointer'>
                    {jobSkill.skill}
                </span>
                <Modal modalId={`edit_modal_${jobSkillId}`}>
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
            </td>
            <td className='w-full text-center'>
                {jobSkill.asked}
                <Modal modalId={`delete_modal_${jobSkillId}`}>
                    <form onSubmit={handleDeleteTodo}>
                        <h3 className='text-lg font-bold'>
                            Delete the job skill:
                            <br /> {jobSkill.skill} ?
                        </h3>
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
            <td className='flex gap-5'>
                <FaMinus
                    onClick={handleTaskDecrease}
                    className='text-white-500'
                    cursor='pointer'
                    size={25}
                />
                <ImPlus
                    onClick={handleTaskIncrease}
                    className='text-blue-500'
                    cursor='pointer'
                    size={25}
                />
            </td>
        </tr>
    )
}

export default JobSkill
