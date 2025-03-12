import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import {
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Wrapper from './Wrapper';

const SystemData = () => {
  const [data, setData] = useState([]); // Data for Recharts
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'road_data'));
        const dataArr = querySnapshot.docs.map((doc) => doc.data());

        // Group data by 'etat' and calculate average vibration for each group
        const groupedData = dataArr.reduce((groups, item) => {
          const etat = item.etat; // Get the 'etat' value
          if (!groups[etat]) {
            groups[etat] = { count: 0, totalVibration: 0 }; // Initialize group data
          }
          groups[etat].count += 1; // Increment count for this 'etat'
          groups[etat].totalVibration += item.vibration; // Sum vibrations for this 'etat'
          return groups;
        }, {});

        // Format data for Recharts
        const chartData = Object.entries(groupedData).map(([etat, { count, totalVibration }]) => ({
          etat,
          averageVibration: totalVibration / count, // Calculate average vibration
          count, // Number of entries for this 'etat'
        }));

        setData(chartData); // Set the formatted data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();

    // Real-time updates with onSnapshot
    const unsubscribe = onSnapshot(collection(db, 'road_data'), (snapshot) => {
      const updatedData = snapshot.docs.map((doc) => doc.data());

      // Group updated data by 'etat'
      const groupedData = updatedData.reduce((groups, item) => {
        const etat = item.etat;
        if (!groups[etat]) {
          groups[etat] = { count: 0, totalVibration: 0 };
        }
        groups[etat].count += 1;
        groups[etat].totalVibration += item.vibration;
        return groups;
      }, {});

      // Format updated data for Recharts
      const chartData = Object.entries(groupedData).map(([etat, { count, totalVibration }]) => ({
        etat,
        averageVibration: (totalVibration / count).toFixed(2),
        count,
      }));

      setData(chartData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Wrapper>
      <Typography variant="h4" gutterBottom marginTop={5} color='secondary'>
        Données Statistiques (Groupées par État)
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="etat"/>  
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="averageVibration" fill="#8884d8" name="Vibration Moyenne" />
            <Bar dataKey="count" fill="#82ca9d" name="Nombre d'Entrées" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Wrapper>
  )
};

export default SystemData;