import React, { useEffect, useState } from 'react';
import { supabase } from '../client';

const CrewmateCard = ({ crewmateId }) => {
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        const { data, error } = await supabase
          .from('Crewmates')
          .select()
          .eq('id', crewmateId)
          .single();

        if (error) {
          throw error;
        }

        setCrewmate(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCrewmate();
  }, [crewmateId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!crewmate) {
    return <div>Crewmate not found</div>;
  }

  return (
    <div className="crewmate-card" id={crewmate.color}>
      {/* Link to edit using 'uuid' */}
      <a href={`/${crewmate.uuid}/edit`}>
        <img className="single-crewmate-img" src="https://shimmering-stardust-c75334.netlify.app/assets/crewmate.ce385016.png" alt={`${crewmate.color} Crewmate`} />
        <h3>Name of Crewmate: <span>{crewmate.name}</span></h3>
        <h3>Speed of Crewmate: <span>{crewmate.speed} mph</span></h3>
        <h3>Color of Crewmate: <span>{crewmate.color}</span></h3>
      </a>
      {/* Link to edit using 'uuid' */}
      <a href={`/${crewmate.uuid}/edit`}><button type="button">Edit Crewmate</button></a>
    </div>
  );
};

export default CrewmateCard;


