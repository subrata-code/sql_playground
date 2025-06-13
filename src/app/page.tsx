'use client'

import React, { useState } from 'react'

function SQLDeepIntro() {
  return (
    <section className="max-w-4xl mx-auto mb-12 bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4">SQL: The Language of Databases</h1>
      <p className="text-lg text-gray-700 mb-6">
        <b>SQL (Structured Query Language)</b> is the standard language for interacting with relational databases. 
        It allows you to create, read, update, and delete data efficiently and securely. SQL is used by developers, data analysts, and database administrators worldwide.
      </p>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Why Learn SQL?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>SQL is essential for working with data in almost every industry.</li>
          <li>It is the foundation for data analysis, backend development, and business intelligence.</li>
          <li>SQL skills are highly sought after in tech, finance, healthcare, and more.</li>
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Types of SQL Statements</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><b>DDL (Data Definition Language):</b> CREATE, ALTER, DROP, TRUNCATE</li>
          <li><b>DML (Data Manipulation Language):</b> SELECT, INSERT, UPDATE, DELETE</li>
          <li><b>DCL (Data Control Language):</b> GRANT, REVOKE</li>
          <li><b>TCL (Transaction Control Language):</b> COMMIT, ROLLBACK, SAVEPOINT</li>
        </ul>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">How SQL Works: The Workflow</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-1">
          <li><b>Write a Query:</b> You write an SQL statement to tell the database what you want.</li>
          <li><b>Send to Database:</b> The query is sent to the database server.</li>
          <li><b>Execution:</b> The database parses, optimizes, and executes your query.</li>
          <li><b>Result:</b> The database returns the result (data or confirmation) to you.</li>
        </ol>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Popular SQL Databases</h2>
        <div className="flex flex-wrap gap-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">MySQL</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">PostgreSQL</span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">SQLite</span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">SQL Server</span>
          <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-semibold">Oracle</span>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Example: A Simple SQL Query</h2>
        <div className="bg-gray-100 rounded p-4 flex items-center">
          <code className="font-mono text-blue-900 text-lg">SELECT name, age FROM users WHERE age &gt; 18;</code>
          <button
            className="ml-3 px-2 py-1 text-xs rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={() => navigator.clipboard.writeText('SELECT name, age FROM users WHERE age > 18;')}
            type="button"
          >
            Copy
          </button>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (res.ok) {
        const data = await res.json();
        setResults(data.results);
      } else {
        setError((await res.json()).error);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SQLDeepIntro />
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto mt-10">
        {/* Theory Section */}
        <section className="md:w-1/2 bg-white rounded-lg shadow-md p-8 mb-8 md:mb-0">
          <h1 className="text-3xl font-bold mb-4 text-blue-700">Learn SQL</h1>
          <p className="mb-4 text-gray-700">
            SQL (Structured Query Language) is a standard language for accessing and manipulating databases.
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            <li><b>SELECT</b> - extracts data from a database</li>
            <li><b>INSERT</b> - inserts new data into a database</li>
            <li><b>UPDATE</b> - updates data in a database</li>
            <li><b>DELETE</b> - deletes data from a database</li>
          </ul>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-4">
            <p className="font-mono text-blue-800">
              <b>Example:</b><br />
              <span>SELECT * FROM users;</span>
            </p>
          </div>
          <p className="text-gray-600">
            Try writing your own SQL queries in the playground!
          </p>
        </section>

        {/* Playground Section */}
        <section className="md:w-1/2 bg-gray-50 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-5 text-blue-700">SQL Playground</h2>
          <textarea
            className="w-full p-2 border rounded-md mb-4 font-mono"
            rows={5}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Write your SQL query here"
          ></textarea>
          <button
            disabled={loading}
            onClick={handleQuery}
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed mb-4"
          >
            {loading ? 'Running...' : 'Execute'}
          </button>

          {error && <div className="bg-red-100 p-4 mt-2 rounded-md text-red-700">{error}</div>}

          {results.length > 0 && (
            <div className="overflow-x-auto mt-4">
              <table className="w-full border border-gray-300 rounded-md">
                <thead className="bg-gray-100 font-semibold">
                  <tr>
                    {Object.keys(results[0]).map((header) => (
                      <th key={header} className="p-2 border">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((item, idx) => (
                    <tr key={idx}>
                      {Object.keys(item).map((header) => (
                        <td key={header} className="p-2 border">{item[header]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}