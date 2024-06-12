import React from 'react'
import { IJobSkill } from '../types/jobSkill'
import JobSkill from './JobSkill'

interface JobSkillsProps {
    jobSkills: IJobSkill[]
    onUpdate: (updatedJobSkill: IJobSkill) => void
    onDelete: (jobSkillId: string) => void
}

const JobSkills: React.FC<JobSkillsProps> = ({ jobSkills, onUpdate, onDelete }) => {
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
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default JobSkills
