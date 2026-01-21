'use client';

import { useQuery } from '@apollo/client/react';
import { GET_CHARACTERS } from '@/lib/graphql/queries';

interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    image: string;
}

interface GetCharactersData {
    characters: {
        results: Character[];
    };
}

export function ExampleQuery() {
    const { loading, error, data, refetch } = useQuery<GetCharactersData>(GET_CHARACTERS);

    if (loading) {
        return (
            <div className="p-8 text-center">
                <div className="animate-spin text-blue-500 text-4xl mb-4">⏳</div>
                <p className="text-gray-400">Loading Rick and Morty characters...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-500 mb-2">Error: {error.message}</p>
                <button
                    onClick={() => refetch()}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    Rick & Morty Characters
                </h2>
                <button
                    onClick={() => refetch()}
                    className="text-sm px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                >
                    🔄 Refresh
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {data?.characters.results.map((char) => (
                    <div key={char.id} className="flex items-center gap-3 p-3 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <img
                            src={char.image}
                            alt={char.name}
                            className="w-12 h-12 rounded-full ring-2 ring-white/20"
                        />
                        <div>
                            <p className="font-semibold text-white">{char.name}</p>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${char.status === 'Alive' ? 'bg-green-500' :
                                        char.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                                    }`} />
                                {char.status} - {char.species}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
