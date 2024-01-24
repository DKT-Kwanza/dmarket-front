import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function TabMenu({ menu, selectedTab, onTabChange }) {

    const handleChange = (event, newValue) => {
        onTabChange(newValue);
    };

    return (
        <Box sx={{ width: '100%', mb: 3 }}>
            <Tabs
                onChange={handleChange}
                value={selectedTab}
                aria-label="Tabs where each tab needs to be selected manually"
            >
                {
                    menu.map((object, index) => (
                        <Tab key={index} label={`${object.title} ${object.count}`} />
                    ))
                }
            </Tabs>
        </Box>
    );
}
