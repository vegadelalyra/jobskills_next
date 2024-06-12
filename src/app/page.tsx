import AddJobSkill from './components/AddJobSkill'
import JobSkills from './components/JobSkills'

export default async function Home() {
    return (
        <main className='max-w-4xl my-5 flex flex-col gap-4 text-center h-full'>
            <div >
                <h1 className='text-2xl font-bold mb-7 text-aliceblue'>asked skills for jobs</h1>
                <AddJobSkill />
            </div>
            <JobSkills />
        </main>
    )
}
