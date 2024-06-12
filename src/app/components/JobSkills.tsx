import React from 'react'
import { IJobSkill } from '../types/jobSkill'
import JobSkill from './JobSkill'

interface ApiResponse {
    jobSkills: IJobSkill[]
}

const getJobSkills = async (): Promise<IJobSkill[]> => {
    try {
        const url: string = process.env.API_URL
        const res = await fetch(url, { cache: 'no-cache' })

        if (!res.ok) throw new Error('Failed to fetch job skills')

        const data: ApiResponse = await res.json()
        return data.jobSkills
    } catch (error) {
        console.log('Error loading job skills:', error)
        return []
    }
}

const JobSkills: React.FC = async () => {
    const jobSkills = await getJobSkills()

    return (
        <div className='overflow-x-auto'>
            <table className='table'>
                {/* head */}
                <thead>
                    <tr>
                        <th>Skill</th>
                        <th>Times asked</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {jobSkills.map(jobSkill => (
                        <JobSkill
                            key={String(jobSkill._id)}
                            jobSkill={jobSkill}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default JobSkills
