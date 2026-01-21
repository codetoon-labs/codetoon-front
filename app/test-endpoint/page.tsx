'use client';

import { useState } from 'react';

export default function TestEndpointPage() {
    const [result, setResult] = useState<string>('');
    const [testing, setTesting] = useState(false);

    const testEndpoint = async (url: string) => {
        setTesting(true);
        setResult(`Testing ${url}...`);
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query GetCustomers {
                            allCustomers {
                                name
                                image {
                                    full_url
                                }
                                id
                            }
                        }
                    `
                }),
            });

            if (!response.ok) {
                setResult(`HTTP Error: ${response.status} ${response.statusText}\n\nResponse: ${await response.text()}`);
                return;
            }

            const data = await response.json();
            setResult(JSON.stringify(data, null, 2));
        } catch (err: any) {
            setResult(`Fetch Error: ${err.message}\n\nThis usually means:\n1. The server is not running\n2. CORS is blocking the request\n3. The URL is incorrect\n4. Network connectivity issue`);
        } finally {
            setTesting(false);
        }
    };

    const testSimpleGet = async (url: string) => {
        setTesting(true);
        setResult(`Testing GET request to ${url}...`);
        
        try {
            const response = await fetch(url, {
                method: 'GET',
            });

            setResult(`Status: ${response.status}\nHeaders: ${JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2)}`);
        } catch (err: any) {
            setResult(`GET Error: ${err.message}`);
        } finally {
            setTesting(false);
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">GraphQL Endpoint Tester</h1>
            
            <div className="space-y-4 mb-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                    <h2 className="font-bold mb-2">Current Endpoint:</h2>
                    <code className="text-sm bg-white p-2 rounded block">
                        {process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'https://codetoon-master-zszpma.laravel.cloud/graphql'}
                    </code>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => testEndpoint('https://codetoon-master-zszpma.laravel.cloud/graphql')}
                        disabled={testing}
                        className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        Test /graphql (POST)
                    </button>

                    <button
                        onClick={() => testSimpleGet('https://codetoon-master-zszpma.laravel.cloud/graphql')}
                        disabled={testing}
                        className="px-4 py-3 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                    >
                        Test /graphql (GET)
                    </button>

                    <button
                        onClick={() => testSimpleGet('https://codetoon-master-zszpma.laravel.cloud')}
                        disabled={testing}
                        className="px-4 py-3 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-400"
                    >
                        Test Base URL
                    </button>

                    <button
                        onClick={() => testSimpleGet('https://codetoon-master-zszpma.laravel.cloud/graphiql')}
                        disabled={testing}
                        className="px-4 py-3 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-400"
                    >
                        Test /graphiql
                    </button>
                </div>
            </div>

            {result && (
                <div className="p-4 bg-gray-100 rounded">
                    <h3 className="font-bold mb-2">Result:</h3>
                    <pre className="text-xs overflow-auto max-h-96 bg-white p-4 rounded">
                        {result}
                    </pre>
                </div>
            )}

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <h3 className="font-bold mb-2">⚠️ Common Issues:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>CORS Error:</strong> Your Laravel backend needs to allow requests from localhost:3000</li>
                    <li><strong>404 Error:</strong> The /graphql endpoint doesn't exist - check your Laravel routes</li>
                    <li><strong>Failed to fetch:</strong> Server is not running or URL is wrong</li>
                    <li><strong>500 Error:</strong> Server error - check Laravel logs</li>
                </ul>
            </div>
        </div>
    );
}

