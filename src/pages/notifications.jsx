import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { serverFunctions } from '../utils/communicate';
import NotifyContext from '../context/NotifyContext';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Chip, CircularProgress } from '@mui/material';

function timeDifference(currentTime, commentTime) {
  const difference = currentTime - commentTime;
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? '1 year ago' : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else {
    return seconds <= 10 ? 'Just now' : `${seconds} seconds ago`;
  }
}


export default function NotificationPage() {
  const navigate = useNavigate()
  const { Notify } = React.useContext(NotifyContext)
  const { setUser } = React.useContext(UserContext)

  const [notifs, setNotifs] = React.useState([])

  const loadData = async () => {
    serverFunctions
      .getNotifications()
      .then(data => {
        setNotifs(data.data)
      })
      .catch(err => {
        window.alert(err)
      })
  }

  React.useEffect(() => {
    loadData()
  }, [])

  const markAsRead = async (notifId) => {
    console.log(notifId)
    try {
      await serverFunctions
        .readNotification(notifId)
      await loadData()
    } catch (err) {
      window.alert(err)
    }
  }

  if (!notifs) {
    return <div><CircularProgress /></div>
  }
  console.log('Notifications', notifs)
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        {
          notifs.map(notif => {
            return (
              <Accordion key={notif.id} sx={{ width: '50vw' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}>
                    <div>
                      <strong>{notif.title}</strong>
                    </div>
                    <div>
                      {
                        notif.viewed === false &&
                        <>
                          <Chip label={timeDifference(new Date(), new Date(notif.timeStamp))} />
                          <Button variant='contained' onClick={() => { markAsRead(notif.id) }}>Mark as read</Button>
                        </>
                      }
                    </div>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {notif.info}
                </AccordionDetails>
              </Accordion>
            )
          })
        }
      </Box>
    </Container>
  );
}