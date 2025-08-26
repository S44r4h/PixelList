import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Tässä lähetetään GET-pyyntö, joka tuo käyttäjän tiedot
      if (!user) {
        axios
          .get(`${import.meta.env.VITE_API_URL}/signinuser/profile`, {
            withCredentials: true, // Tämä varmistaa, että evästeet (kuten token) lähetetään mukana
          })
          .then(({ data }) => {
            setUser(data); // Asetetaan käyttäjän tiedot
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          })
          .finally(() => {
            setLoading(false); // Lopetetaan lataustila joka tapauksessa
          });
      }
    };
    fetchData();
  }, []); // Tämä toimii vain kerran, koska se riippuu 'user' tilasta

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
