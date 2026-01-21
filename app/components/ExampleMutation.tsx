'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { CREATE_USER } from '@/lib/graphql/mutations';
import { GET_USERS } from '@/lib/graphql/queries';

interface CreateUserData {
    createUser: {
        id: string;
        name: string;
        email: string;
    };
}

interface CreateUserVariables {
    name: string;
    email: string;
}

export function ExampleMutation() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [createUser, { loading, error, data }] = useMutation<
        CreateUserData,
        CreateUserVariables
    >(CREATE_USER, {
        // Refetch queries after mutation
        refetchQueries: [{ query: GET_USERS }],
        // Or update cache manually
        // update(cache, { data }) {
        //   const existingUsers = cache.readQuery<GetUsersData>({ query: GET_USERS });
        //   if (existingUsers && data) {
        //     cache.writeQuery({
        //       query: GET_USERS,
        //       data: {
        //         users: [...existingUsers.users, data.createUser],
        //       },
        //     });
        //   }
        // },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser({
                variables: { name, email },
            });
            // Reset form
            setName('');
            setEmail('');
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Create User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                >
                    {loading ? 'Creating...' : 'Create User'}
                </button>
            </form>
            {error && <p className="mt-4 text-red-600">Error: {error.message}</p>}
            {data && (
                <p className="mt-4 text-green-600">
                    User created successfully: {data.createUser.name}
                </p>
            )}
        </div>
    );
}
