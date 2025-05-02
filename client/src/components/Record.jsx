import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export default function Record() {
  const { user } = useContext(UserContext);

    if (!user) {
        return <div>Loading...</div>;  // Näytetään lataus, jos käyttäjätietoja ei ole vielä saatu
    }

    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            <p>Your ID is: {user.id}</p>
        </div>
    );
}