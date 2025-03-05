import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";
import "./RequestForm.css"; 

function RequestForm() {
    const [formData, setFormData] = useState({
        patientName: "", patientAge: "", hospitalName: "", bloodGroup: "",
        unitsRequired: "", urgencyLevel: "", byStanderName: "",
        contactNumber: "", byStanderEmail: "", location: "", status: "Pending"
    });


    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await axios.post("https://life-link-blood-donation-system-server-indol.vercel.app/recipient/requestBlood", formData);
            if (response.data.success) {  
                handleSuccess(response.data.message);
                setFormData({
                    patientName: "", patientAge: "", hospitalName: "",
                    bloodGroup: "", unitsRequired: "", urgencyLevel: "",
                    byStanderName: "", contactNumber: "", byStanderEmail: "",
                    location: "", status: "Pending"
                });
            }
        } catch (err) {
            handleError(err.response?.data?.message || "An error occurred");  
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="request-form-container">
            <div className="request-form-box">
                <h2>Blood Request Form</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} required />
                    <input type="number" name="patientAge" placeholder="Patient Age" value={formData.patientAge} onChange={handleChange} required />
                    <input type="text" name="hospitalName" placeholder="Hospital Name" value={formData.hospitalName} onChange={handleChange} required />
                    
                    <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                        <option value="">Select Blood Group</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>
                    
                    <input type="number" name="unitsRequired" placeholder="Units Required" value={formData.unitsRequired} onChange={handleChange} required />
                    
                    <select name="urgencyLevel" value={formData.urgencyLevel} onChange={handleChange} required>
                        <option value="">Select Urgency Level</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    <input type="text" name="byStanderName" placeholder="Bystander Name" value={formData.byStanderName} onChange={handleChange} required />
                    <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
                    <input type="email" name="byStanderEmail" placeholder="Bystander Email" value={formData.byStanderEmail} onChange={handleChange} />
                    <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />

                    <button type="submit" className={`request-form-button ${loading ? "loading" : ""}`} disabled={loading}>
                        {loading ? <div className="loading"></div> : "Submit"}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default RequestForm;
