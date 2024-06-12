'use client'

import AddJobSkill from './components/AddJobSkill'
import JobSkills from './components/JobSkills'
import { IJobSkill } from './types/jobSkill'
import { useState, useEffect } from 'react'

export default function Home() {
    const [jobSkills, setJobSkills] = useState<IJobSkill[]>([])
    const url: string = process.env.NEXT_PUBLIC_JOBSKILLS_API_URL 

    const fetchJobSkills = async () => {
        try {
            const res = await fetch(url, { cache: 'no-cache' })

            if (!res.ok) throw new Error('Failed to fetch job skills')

            const data = await res.json()
            setJobSkills(data.jobSkills)
        } catch (error) {
            console.log('Error loading job skills:', error)
        }
    }

    useEffect(() => {
        fetchJobSkills()
    }, [])

    const handleAddJobSkill = (newJobSkill: IJobSkill) => {
        setJobSkills(prevSkills => [...prevSkills, newJobSkill])
    }

    const handleUpdateJobSkill = (updatedJobSkill: IJobSkill) => {
        setJobSkills(prevSkills =>
            prevSkills.map(skill =>
                skill._id === updatedJobSkill._id ? updatedJobSkill : skill
            )
        )
    }

    const handleDeleteJobSkill = (jobSkillId: string) => {
        setJobSkills(prevSkills =>
            prevSkills.filter(skill => String(skill._id) !== jobSkillId)
        )
    }

    return (
        <main className='max-w-4xl my-5 flex flex-col gap-4 text-center h-full'>
            <div>
                <h1 className='text-2xl font-bold mb-7 text-aliceblue'>asked skills for jobs</h1>
                <AddJobSkill onAdd={handleAddJobSkill} />
            </div>
            <JobSkills
                jobSkills={jobSkills}
                onUpdate={handleUpdateJobSkill}
                onDelete={handleDeleteJobSkill}
            />
        </main>
    )
}
