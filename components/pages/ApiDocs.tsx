import React from 'react';
import usePageTitle from '../../hooks/usePageTitle';

const CodeBlock: React.FC<{ children: React.ReactNode, language: string }> = ({ children, language }) => (
    <pre className={`bg-slate-800 text-slate-200 p-4 rounded-lg my-4 overflow-x-auto text-sm language-${language}`}>
        <code>{children}</code>
    </pre>
);

const ApiDocs: React.FC = () => {
    usePageTitle('API Documentation');
    const exampleRequest = `{
  "framework": "R-T-F",
  "data": {
    "role": "Expert Facebook Ad Marketer",
    "task": "Design a compelling Facebook ad campaign for a new line of fitness apparel.",
    "format": "A storyboard outlining the sequence of ad creatives, including copy and visuals."
  }
}`;
    const exampleSuccessResponse = `{
  "status": "success",
  "transformedPrompt": "Act as a Expert Facebook Ad Marketer. Your task is to Design a compelling Facebook ad campaign for a new line of fitness apparel. Present the answer in the following format: A storyboard outlining the sequence of ad creatives, including copy and visuals."
}`;
    const exampleErrorResponse = `{
  "status": "error",
  "message": "Invalid framework 'XYZ' specified. Available frameworks are: R-T-F, T-A-G, B-A-B, C-A-R-E, R-I-S-E."
}`;

    return (
        <div className="max-w-4xl mx-auto prose prose-slate">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">API Documentation</h1>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-600">Integrate the Praia prompt engine into your own applications.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-slate-800">Introduction</h2>
                <p>The Praia API allows you to programmatically transform structured inputs into fully-formed prompts using our powerful frameworks. This is ideal for building prompt generation into your own workflows and applications.</p>
                
                <h2 className="text-2xl font-bold text-slate-800 mt-8">Authentication</h2>
                <p>API access is authenticated using Bearer tokens. You can generate and manage your API keys on your <a href="#/profile" className="text-sky-600 hover:text-sky-800">Profile page</a>.</p>
                <p>Include your API key in the Authorization header of your requests:</p>
                <CodeBlock language="bash">{`Authorization: Bearer <YOUR_API_KEY>`}</CodeBlock>

                <h2 className="text-2xl font-bold text-slate-800 mt-8">Endpoint</h2>
                <h3 className="text-xl font-semibold text-slate-700 mt-4">Transform Prompt</h3>
                <p><span className="font-mono bg-slate-200 text-slate-800 px-2 py-1 rounded">POST /v1/transform</span></p>

                <h4 className="text-lg font-semibold text-slate-700 mt-6">Request Body</h4>
                <p>The request must be a JSON object with two keys: <code>framework</code> and <code>data</code>.</p>
                <ul>
                    <li><code>framework</code>: A string specifying the desired framework (e.g., "R-T-F").</li>
                    <li><code>data</code>: An object containing the key-value pairs for the chosen framework.</li>
                </ul>

                <h5 className="text-md font-semibold text-slate-700 mt-4">Example Request:</h5>
                <CodeBlock language="json">{exampleRequest}</CodeBlock>

                <h4 className="text-lg font-semibold text-slate-700 mt-6">Success Response (200 OK)</h4>
                <p>On success, the API returns the constructed prompt.</p>
                <CodeBlock language="json">{exampleSuccessResponse}</CodeBlock>

                <h4 className="text-lg font-semibold text-slate-700 mt-6">Error Response (4xx)</h4>
                <p>If the request is invalid (e.g., bad framework name), the API returns an error message.</p>
                <CodeBlock language="json">{exampleErrorResponse}</CodeBlock>
            </div>
        </div>
    );
};

export default ApiDocs;