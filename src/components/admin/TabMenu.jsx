import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function TabMenu({menu, selectedTab, onTabChange}) {

    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        // selectedTab이 변경되면 해당 탭의 인덱스를 설정
        const tabIndex = menu.findIndex((item) => item.title === selectedTab);
        if (tabIndex !== -1) {
            setValue(tabIndex);
        }
    }, [selectedTab, menu]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // 선택된 탭의 title을 콜백으로 전달
        onTabChange(menu[newValue].title);
    };

    return (
        <Box sx={{width: '100%', mb: 3}}>
            <Tabs
                onChange={handleChange}
                value={value}
                aria-label="Tabs where each tab needs to be selected manually">
                {menu.map((object, index) => (
                    object.count
                        ? <Tab key={index} label={`${object.title} ${object.count}`}/>
                        : <Tab key={index} label={`${object.title}`}/>
                ))}
            </Tabs>
        </Box>
    );
}
