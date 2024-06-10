'use client'

import React, { FormEventHandler, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from './Modal'
import { useRouter } from 'next/navigation'
import { addTodo } from '../api'
import { v4 as uuidv4 } from 'uuid'

const AddTask = () => {
    const router = useRouter()
    const [newTaskValue, setNewTaskValue] = useState<string>('')

    
    const openModal = () => {
        const modal = document.getElementById(
                'create_modal'
            ) as HTMLDialogElement | null
            
        if (modal) modal.showModal()    
    }

    const closeModal = () => {
          const modal = document.getElementById(
                'create_modal'
            ) as HTMLDialogElement | null
  
        if (modal) modal.close()
    }

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault()
        await addTodo({
            id: uuidv4(),
            text: newTaskValue
        })
        setNewTaskValue('')
        closeModal()
        router.refresh()
    }

    return (
        <div>
            <button onClick={openModal} className='btn btn-primary w-full'>
                Add new task <AiOutlinePlus className='ml-2' size={18} />
            </button>
            <Modal modalId='create_modal' >
                <form onSubmit={handleSubmitNewTodo}>
                    <h3 className='text-lg font-bold'>Add new task</h3>
                    <div className='modal-action'>
                        <input
                            value={newTaskValue}
                            onChange={e => setNewTaskValue(e.target.value)}
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
        </div>
    )
}

export default AddTask