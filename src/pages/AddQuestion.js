import React, { useState, useEffect } from "react";

const AddQuestion = ({ onClose }) => {
    const [question, setQuestion] = useState("");
    const [materials, setMaterials] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState("");

    // Fetch materials from backend
    useEffect(() => {
        fetch("/api/lectures") // Updated API call
            .then((res) => res.json())
            .then((data) => setMaterials(data))
            .catch((err) => console.error("Error fetching materials:", err));
    }, []);

    // Handle form submission
    const handleSubmit = async () => {
        if (!question || !selectedMaterial) {
            alert("Please enter a question and select a material.");
            return;
        }

        const response = await fetch("/api/quizzes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, materialId: selectedMaterial }), // Updated
        });

        if (response.ok) {
            alert("Question added successfully!");
            onClose();
        } else {
            alert("Failed to add question");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add Question</h2>
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your question"
                />
                <select value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
                    <option value="">Select Material</option>
                    {materials.map((material) => (
                        <option key={material._id} value={material._id}>
                            {material.title}
                        </option>
                    ))}
                </select>
                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSubmit}>Add Question</button>
                </div>
            </div>
        </div>
    );
};

export default AddQuestion;
