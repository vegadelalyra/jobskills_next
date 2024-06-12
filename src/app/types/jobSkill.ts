import { ObjectId } from 'mongodb'

export interface IJobSkill {
    _id: ObjectId
    skill: string
    asked: number
}
