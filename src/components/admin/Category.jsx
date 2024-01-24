import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Category() {
    return (
        <FormControl sx={{paddingBottom: '12px'}}>
            <FormLabel id="demo-row-radio-buttons-group-label">카테고리를 선택하세요.</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                {
                    ['여성 의류', '남성 의류', '유아 의류', '신발', '가방/잡화', '생필품', '주방용품', '메이크업', '바디/헤어',
                    '가구', '침구', '인테리어', '문구/사무용품', '데스크탑/노트북', '모바일/태블릿', '영상가전', '음향가전', '주방가전',
                    '생활가전', '휘트니스', '등산/수영', '구기', '골프', '캠핑', '자전거/기타레저'].map((item, index)=> (
                        <FormControlLabel value={item} control={<Radio size="small"/>} label={item} />
                    ))
                }
            </RadioGroup>
        </FormControl>
    );
}