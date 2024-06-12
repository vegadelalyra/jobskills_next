import JobSkill from '@/models/jobSkill'
import { connectMongoDB } from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'
;(async () => await connectMongoDB())()

interface Params {
    id: string
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Params }
) {
    const { id } = params
    await JobSkill.findByIdAndDelete(id)

    return NextResponse.json(
        { message: 'You removed a job skill register' },
        { status: 200 }
    )
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Params }
) {
    const { id } = params
    const { skill, asked } = await request.json()

    interface UpdateFields {
        skill?: string
        asked?: boolean
    }

    const updateFields: UpdateFields = {}
    if (skill !== undefined) updateFields.skill = skill
    if (asked !== undefined) updateFields.asked = asked

    if (Object.keys(updateFields).length === 0) {
        return NextResponse.json(
            { error: 'No valid fields provided for update' },
            { status: 400 }
        )
    }

    const res = await JobSkill.findByIdAndUpdate(id, updateFields, {
        new: true
    })

    if (res === null)
        throw new Error(
            '[jobskills/[id]/route.ts]: Error patching your job skill!'
        )

    return NextResponse.json(
        { message: 'Job skill updated successfully', updatedFields: res },
        { status: 200 }
    )
}

export async function GET(
    request: NextRequest,
    { params }: { params: Params }
) {
    const { id } = params
    const jobSkill = await JobSkill.findById(id)
    return NextResponse.json({ message: 'SICK!', jobSkill }, { status: 200 })
}
