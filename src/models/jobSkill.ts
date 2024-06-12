// src/models/JobSkills.ts
import { IJobSkill } from '@/app/types/jobSkill'
import { Schema, model, models, Model } from 'mongoose'

// Create the JobSkills schema
const JobSkillSchema = new Schema<IJobSkill>(
    {
        skill: { type: String, required: true },
        asked: { type: Number, default: 0 }
    },
    { timestamps: true }
)

// Create the JobSkills model
const JobSkill: Model<IJobSkill> =
    models.JobSkill || model<IJobSkill>('JobSkill', JobSkillSchema)

export default JobSkill
