import React, { useEffect, useState } from "react";

const StudentMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/materials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMaterials(data.materials);
      })
      .catch((err) => console.error("Error fetching materials:", err));
  }, []);

  // Fetch Queries for a Selected Material
  const fetchQueries = async (materialId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/materials/${materialId}/queries`);
      const data = await response.json();
      if (data.success) {
        setQueries(data.queries);
      }
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  // Handle Query Submission
  const handleQuerySubmit = async () => {
    if (!query) return alert("Enter your question!");

    try {
      const response = await fetch(`http://localhost:5000/api/materials/${selectedMaterial}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: "12345", studentName: "John Doe", queryText: query }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Query submitted!");
        setQuery("");
        fetchQueries(selectedMaterial); // Refresh query list
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting query:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Lecture Materials</h1>
      {materials.length === 0 ? (
        <p>No materials available.</p>
      ) : (
        materials.map((material) => (
          <div key={material._id} className="border p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold">{material.title}</h2>
            <a href={`http://localhost:5000${material.filePath}`} download className="text-blue-500 underline">
              Download
            </a>
            <button
              onClick={() => {
                setSelectedMaterial(material._id);
                setIsModalOpen(true);
                fetchQueries(material._id);
              }}
              className="bg-green-600 text-white px-3 py-1 ml-4 rounded-lg"
            >
              Ask a Query
            </button>
          </div>
        ))
      )}

      {/* Query Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Ask a Query</h2>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your question..."
              className="w-full border px-3 py-2 rounded-lg mb-4"
            ></textarea>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button onClick={handleQuerySubmit} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Submit Query
              </button>
            </div>

            {/* Queries List */}
            <h3 className="mt-4 text-lg font-semibold">Previous Queries</h3>
            {queries.length > 0 ? (
              <ul className="mt-2">
                {queries.map((query) => (
                  <li key={query._id} className="border-b p-2">
                    <strong>{query.studentName}:</strong> {query.queryText}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No queries yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMaterials;
