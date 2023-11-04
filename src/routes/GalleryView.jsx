import React, { useEffect, useState } from 'react';
import CrewmateCard from "../components/CrewmateCard";
import { supabase } from '../client';

const GalleryView = () => {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('Crewmates')
        .select();

      if (error) {
        console.log('Error:', error);
      } else {
        setCrewmates(data);
      }
    };

    fetchCrewmates();
  }, []);

  return (
    <div>
      <h1>Your Crewmate Gallery!</h1>
      <div className="crewmate-container">
        {crewmates.length > 0 ? (
          crewmates.map(crewmate => (
            // Change this line to pass the correct prop
            <CrewmateCard key={crewmate.id} crewmateId={crewmate.id} />
          ))
        ) : (
          <p>No crewmates found. Create your first crewmate!</p>
        )}
      </div>
    </div>
  );
};

export default GalleryView;
