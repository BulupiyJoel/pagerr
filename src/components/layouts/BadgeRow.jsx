import React from "react";
import { Typography, Box } from "@mui/material";
import { TbSquareRounded } from "react-icons/tb";

const BadgeRow = () => {
    // Array to hold the badge information for better scalability
    const stateArray = [
        {
            label: "Critique",
            color: "red" // Red for Critique
        },
        {
            label: "Mauvais",
            color: "orange" // Orange for Mauvais
        },
        {
            label: "Moyen",
            color: "yellow" // Yellow for Moyen
        },
        {
            label: "Bon",
            color: "green" // Green for Bon
        }
    ];

    return (
        <Typography variant="h6" gutterBottom color="secondary" marginY={4} fontWeight={200}>
            <Box display="flex" alignItems="center" gap={3}>
                {stateArray.map((state, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    ><Typography variant="body2" color="secondary" marginRight={2}>
                    {state.label}
                </Typography>
                        <TbSquareRounded size={24} // Set size as desired
                        style={{
                            marginRight: "8px", // Spacing between icon and label
                            fill: state.color, // Fill the inside of the icon with color
                        }}
                        color={state.color} />
                    </Box>
                ))}
            </Box>
        </Typography>
    );
};

export default BadgeRow;
