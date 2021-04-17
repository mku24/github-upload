import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

import fire from '../fire'

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#1a237e',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ReportForm({marker, util}) {

    const [incident, setIncident] = useState('')
    const [description, setDescription] = useState('')
    const [time, setTime] = useState('')


    const addReport = e=> {
      e.preventDefault()
      util(false)

      fire.firestore().collection('reports').add({
          incidentType: incident,
          description: description,
          timeOfIncident: time,
          location: {
            lat: marker[0].lat,
            lng: marker[0].lng,
          },
      })

      setIncident("")
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ReportProblemIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Incident Form
        </Typography>
        <form className={classes.form} onSubmit={addReport}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="incident"
            label="Incident Type"
            name="incident"
            autoFocus
            onChange={event => setIncident(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            id="description"
            multiline
            onChange={event => setDescription(event.target.value)}
          />
          <TextField
            id="timeOfIncident"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            label="Time of Incident"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => setTime(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="I hereby declare that the information provided is true and correct."
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Report
          </Button>
        </form>
      </div>
    </Container>
  );
}