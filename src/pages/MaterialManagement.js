import React, { useState, useEffect } from "react";

const MaterialManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [queries, setQueries] = useState([]);

  // Fetch Materials
  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/materials");
      const data = await response.json();
      if (data.success) setMaterials(data.materials);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Fetch Queries for a Material
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

  // Handle File Upload
  const handleUpload = async () => {
    if (!title || !file) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/materials/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert("Material uploaded successfully!");
        setTitle("");
        setFile(null);
        setIsOpen(false);
        fetchMaterials(); // Refresh list
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Error uploading material:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Material Management</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">Upload, view, and manage lecture materials.</p>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200"
        >
          Upload Material
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Lecture Material</h2>
            <label className="block mb-2 font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter material title"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring focus:border-blue-300"
            />
            <label className="block mb-2 font-medium text-gray-700">Upload File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg mb-4 focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Uploaded Materials</h2>
        {materials.length === 0 ? (
          <p className="text-gray-500">No materials uploaded yet.</p>
        ) : (
          <div className="space-y-6">
            {materials.map((material) => (
              <div key={material._id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-lg text-gray-800">{material.title}</p>
                  <a
                    href={`http://localhost:5000${material.filePath}`}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setSelectedMaterial(material._id);
                      fetchQueries(material._id);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                  >
                    View Queries
                  </button>
                  {selectedMaterial === material._id && queries.length > 0 && (
                    <ul className="mt-4 border-t pt-4 space-y-2">
                      {queries.map((query) => (
                        <li key={query._id} className="border-b p-2 text-gray-700">
                          <strong>{query.studentName}:</strong> {query.queryText}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialManagement;