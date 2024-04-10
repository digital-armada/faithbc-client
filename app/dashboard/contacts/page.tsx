import { getAllMembers } from '@/actions/dashboard';
import BasicTable from '@/components/ui/BasicTable';
import UserForm from '@/components/Forms/FormCreateNewUser';
export default async function Page() {
    const users = await getAllMembers();
    return (
        <section>
            <div className='container'>
                <h1>Profile Page</h1>
                <UserForm />
                <BasicTable users={users} />
                {/* <pre>{JSON.stringify(users, null, 4)}</pre> */}
            </div>
        </section>
    );
}
