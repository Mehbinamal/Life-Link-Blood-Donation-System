import React, { useState } from "react";
import axios from "axios";

function RequestForm() {
    const [formData, setFormData] = useState({
        patientName: "",
        patientAge: "",
        hospitalName: "",
        bloodGroup: "",
        unitsRequired: "",
        urgencyLevel: "",
        byStanderName: "",
        contactNumber: "",
        byStanderEmail: "",
        location: "",
        status: "Pending"
    });
    
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            const response = await axios.post("/api/blood-request", formData);
            if (response.data.success) {
                setSuccessMessage("Blood request submitted successfully");
                setFormData({
                    patientName: "",
                    patientAge: "",
                    hospitalName: "",
                    bloodGroup: "",
                    unitsRequired: "",
                    urgencyLevel: "",
                    byStanderName: "",
                    contactNumber: "",
                    byStanderEmail: "",
                    location: "",
                    status: "Pending"
                });
            }
        } catch (err) {
            setError("Failed to submit blood request. Please check your inputs.");
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Blood Request Form</h2>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="number" name="patientAge" placeholder="Patient Age" value={formData.patientAge} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="hospitalName" placeholder="Hospital Name" value={formData.hospitalName} onChange={handleChange} className="w-full p-2 border rounded" required />
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full p-2 border rounded" required>
                    <option value="">Select Blood Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
                <input type="number" name="unitsRequired" placeholder="Units Required" value={formData.unitsRequired} onChange={handleChange} className="w-full p-2 border rounded" required />
                <select name="urgencyLevel" value={formData.urgencyLevel} onChange={handleChange} className="w-full p-2 border rounded" required>
                    <option value="">Select Urgency Level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <input type="text" name="byStanderName" placeholder="Bystander Name" value={formData.byStanderName} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="email" name="byStanderEmail" placeholder="Bystander Email" value={formData.byStanderEmail} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" required />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>
        </div>
    );
}

export default RequestForm;
