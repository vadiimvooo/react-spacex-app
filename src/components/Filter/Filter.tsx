import React from 'react';
import { RocketType } from '../../types/RocketType';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './Filter.module.scss';
import { motion } from 'framer-motion';

type Props = {
  rockets: RocketType[],
  setRocket: React.Dispatch<React.SetStateAction<string | null>>,
  rocket: string | null,
  setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>,
  success: boolean | null,
  setUpcoming: React.Dispatch<React.SetStateAction<boolean | null>>,
  upcoming: boolean | null,
  filterChange: () => void,
}

export const Filter: React.FC<Props> = ({
  rockets,
  setRocket,
  setSuccess,
  setUpcoming,
  success, 
  upcoming,
  rocket,
  filterChange,
}) => {
  const isAnyFilterExists = success !== null 
    || upcoming !== null
    || rocket !== null;

  return (
    <motion.div
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{ duration: 1 }} 
      className={s.filterContainer}
    >
      <p className={s.filterByTitle}>You can filter launches by:</p>
      <FormControl sx={{ width: 150 }} size="small">
        <InputLabel id="demo-simple-select-label">Rocket</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rocket || ''}
          label="Rocket"
          onChange={(e) => {
            setRocket(e.target.value as string);
            filterChange();
          }}
        >
          {rockets.map(eachRocket => (
            <MenuItem value={eachRocket.id} key={eachRocket.id}>{eachRocket.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: 150 }} size="small">
        <InputLabel id="demo-simple-select-label">Success</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={success === null ? '' : success}
          label="Success"
          onChange={(e) => {
            setSuccess(JSON.parse(e.target.value as string));
            filterChange();
          }}
        >
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ width: 150 }} size="small">
        <InputLabel id="demo-simple-select-label">Upcoming</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={upcoming === null ? '' : upcoming}
          label="Upcoming"
          onChange={(e) => {
            setUpcoming(JSON.parse(e.target.value as string));
            filterChange();
          }}
        >
          <MenuItem value="true">True</MenuItem>
          <MenuItem value="false">False</MenuItem>
        </Select>
      </FormControl>

      {isAnyFilterExists && (
        <Button 
          variant="outlined" 
          startIcon={<DeleteIcon />}
          onClick={() => {
            setUpcoming(null);
            setSuccess(null);
            setRocket(null);
            filterChange();
          }}
        >
        Delete
        </Button>
      )}
    </motion.div>
  );
};
