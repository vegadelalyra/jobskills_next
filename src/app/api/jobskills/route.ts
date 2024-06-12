import JobSkill from '@/models/jobSkill'
import { connectMongoDB } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'
;(async () => await connectMongoDB())()

export async function POST(
    request: NextRequest
): Promise<NextResponse<{ message: string }>> {
    const { skill } = await request.json()
    await JobSkill.create({ skill })

    return NextResponse.json(
        {
            message: 'You have identified a job skill!',
            job_skill: skill
        },
        { status: 201 }
    )
}

export async function GET(): Promise<NextResponse> {
    const jobSkills = await JobSkill.find()
    return NextResponse.json(
        {
            message: 'With this you will become the GOAT!',
            jobSkills
        },
        { status: 200 }
    )
}
