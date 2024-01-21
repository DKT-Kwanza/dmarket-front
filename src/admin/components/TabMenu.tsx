import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

type MenuProps = {
    menu: any;
}
export default function TabMenu({menu}:MenuProps) {

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', mb: 3 }}>
            <Tabs
                onChange={handleChange}
                value={value}
                aria-label="Tabs where each tab needs to be selected manually"
            >
                {
                    menu.map((object:any, index:number) => (
                        <Tab key={index} label={`${object.title} ${object.count}`} />
                    ))
                }
            </Tabs>
        </Box>
    );
}