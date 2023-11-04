import React, { useState, useEffect } from 'react';
import { supabase } from '../client.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const CrewmateView = () => {
    const [formData, setFormData] = useState({
        name: '',
        speed: '',
        color: '',
        id: '' // Added id here to hold the numerical id
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { uuid } = useParams(); // Get the uuid from the URL

    useEffect(() => {
        const fetchCrewmate = async () => {
            try {
                const { data, error } = await supabase
                    .from('Crewmates')
                    .select('*, id') // Select all fields and explicitly request the id
                    .eq('uuid', uuid) // Find crewmate by uuid
                    .single();

                if (error) throw error;

                // Update the formData with the crewmate data and store the numerical id
                setFormData({ 
                    name: data.name, 
                    speed: data.speed, 
                    color: data.color, 
                    id: data.id 
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        // We should check for uuid since it's the parameter from the URL
        if (uuid) fetchCrewmate();
    }, [uuid]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const updateCrewmate = async (idToUpdate) => {
        const { name, speed, color } = formData;

        if (!name || !speed || !color) {
            alert('Please fill all fields and try again');
            return;
        }

        try {
            const { error } = await supabase
                .from('Crewmates')
                .update({ name, speed, color })
                .eq('id', idToUpdate); // Use the numerical id to update the crewmate

            if (error) throw error;

            alert('Crewmate updated successfully!');
            navigate('/gallery');
        } catch (error) {
            alert(error.message);
        }
    };

    const deleteCrewmate = async (idToDelete) => {
        try {
            const { error } = await supabase
                .from('Crewmates')
                .delete()
                .eq('id', idToDelete); // Use the numerical id to delete the crewmate

            if (error) throw error;

            alert('Crewmate successfully deleted!');
            navigate('/gallery');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateCrewmate(formData.id); // Pass the numerical id to your update function
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Update Your Crewmate!</h1>
            <img src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png" className="small-img" alt="Crewmate" />

            <h3>Current Crewmate Info</h3>
            <p>Name: {formData.name} ~ Speed: {formData.speed} ~ Color: {formData.color}</p>

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="miniform-container">
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter crewmate's name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="miniform-container">
                        <label htmlFor="speed">Speed: </label>
                        <input
                            type="number"
                            id="speed"
                            name="speed"
                            placeholder="Enter speed in miles/hr"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="miniform-container">
                        <p>Color: </p>
                        <label htmlFor="red">Red</label>
                        <input
                            type="radio"
                            id="red"
                            name="color"
                            value="red"
                            onChange={handleChange}
                        />

                        <label htmlFor="blue">Blue</label>
                        <input
                            type="radio"
                            id="blue"
                            name="color"
                            value="blue"
                            onChange={handleChange}
                        />

                        <label htmlFor="green">Green</label>
                        <input
                            type="radio"
                            id="green"
                            name="color"
                            value="green"
                            onChange={handleChange}
                        />

                        <label htmlFor="purple">Purple</label>
                        <input
                            type="radio"
                            id="purple"
                            name="color"
                            value="purple"
                            onChange={handleChange}
                        />

                        <label htmlFor="rainbow">Rainbow</label>
                        <input
                            type="radio"
                            id="rainbow"
                            name="color"
                            value="rainbow"
                            onChange={handleChange}
                        />
                    </div>
                    <button className='form-button' type="submit">Update Crewmate</button>
                    <button className='form-button' type="button" onClick={() => deleteCrewmate(formData.id)}>Delete Crewmate</button>
                </form>

            </div>
        </div>
    );
};

export default CrewmateView;
