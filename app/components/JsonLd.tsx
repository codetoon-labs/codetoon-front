import React from 'react';

// Renders schema.org structured data. Server component — no client JS needed.
export default function JsonLd({ data }: { data: Record<string, any> }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
