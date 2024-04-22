import { getMe } from '@/actions/dashboard';

export default async function Page() {
    const user = await getMe();

    return (
        <section>
            <div className='container'>
                <h1>Profile Page</h1>
                <pre>{JSON.stringify(user, null, 4)}</pre>
                {user && (
                    <div>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role.name}</p>
                        <p>Contact Number: {user.contactNumber}</p>
                        <p>
                            Address: {user.Address.houseNumber}{' '}
                            {user.Address.suburb},{user.Address.state},
                            {user.Address.postCode}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
