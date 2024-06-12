'use client'

import React, { FormEventHandler, useState } from 'react'
import { AiOutlineCoffee } from 'react-icons/ai'
import Modal from './Modal'
import { useRouter } from 'next/navigation'

const AddJobSkill = () => {
    const router = useRouter()
    const [newJobSkill, setJobSkill] = useState<string>('')

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

    const handleSubmitNewJobSkill: FormEventHandler<
        HTMLFormElement
    > = async e => {
        e.preventDefault()
        const url: string = 'http://localhost:3000/api/jobskills'

        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ skill: newJobSkill.toLowerCase() }),
                cache: 'no-cache'
            })
        } catch (error) {
            console.log(error)
        }

        setJobSkill('')
        closeModal()
        router.refresh()
    }

    return (
        <div>
            <button
                onClick={openModal}
                className='btn btn-primary w-full md:w-auto'
                style={{ color: 'aliceblue' }}
            >
                Add a new job skill
                <AiOutlineCoffee size={22} />
            </button>
            <Modal modalId='create_modal'>
                <form onSubmit={handleSubmitNewJobSkill}>
                    <h3 className='text-lg font-bold'>Add new job skill</h3>
                    <div className='modal-action'>
                        <input
                            value={newJobSkill}
                            onChange={e => setJobSkill(e.target.value)}
                            type='text'
                            placeholder='Type here'
                            className='input input-bordered w-full'
                            maxLength={12}
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

export default AddJobSkill
