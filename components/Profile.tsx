import { Card, Stack, Typography, IconButton, LinearProgress, Button, Box, CardContent, Avatar } from "@mui/joy";
import React from "react"
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Input from '@mui/joy/Input';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import CardMedia from '@mui/material/CardMedia';
import useMediaQuery from "@mui/material/useMediaQuery";
import { deepOrange, green } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
export default function Plans() {
  const isMobile = useMediaQuery("(width:100%)");

  return (
    <Card
      invertedColors

      size="sm"
      sx={{ boxShadow: 'small' }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography level="title-sm">Update your prefered payment details</Typography>

      </Stack>
      <Card
        sx={{
          display: 'flex',
          mb: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row', md: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',

        }}>


        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: 'auto'
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image="https://t4.ftcdn.net/jpg/04/40/22/63/240_F_440226335_OYwRDsUW3KSXQqrv0HBtqkmeiPTgN9qc.jpg"
            alt="visa card"
          />

        </CardContent>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: `${isMobile ? "100%" : "50"}`,
            height: "fill"
          }}
        >
          <Card
            invertedColors
            variant="soft"
            size="sm"
            sx={{ boxShadow: 'small', width: '100%' }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography level="title-lg">Billing Information</Typography>
              <AccountBalanceWalletOutlinedIcon />
            </Stack>
            <Box
              sx={{
                display: 'flex',
                mb: 1,
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'start', sm: 'center' },
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography level="body-md">Card Number</Typography>
                <Input size="sm" type="number" startDecorator={<AddCardOutlinedIcon />} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography level="body-md">Expiration Date</Typography>
                <Input size="sm" type="date" />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography level="body-md">CVV</Typography>
                <Input size="sm" type="number" startDecorator={<PriorityHighOutlinedIcon />} />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                mb: 1,
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'start', sm: 'center' },
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography level="body-md">Card Holder's Name</Typography>
                <Input size="sm" type="number" startDecorator={<ContactPhoneOutlinedIcon />} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography level="body-md">Mpesa Number</Typography>
                <Input size="sm" type="number" startDecorator={<ContactPhoneOutlinedIcon />} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Typography level="body-sm">.</Typography>
                <Button
                  color="neutral"
                  startDecorator={<CloudUploadOutlinedIcon />}
                  size="sm"
                >Update</Button>
              </Box>
            </Box>
          </Card>
        </Box>
      </Card>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography level="title-sm">Update your prefered payment details</Typography>

      </Stack>
      <Card
        sx={{
          display: 'flex',
          mb: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row'},
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',

        }}>


        <Card sx={{width: '40%'}}>
          <CardMedia
            component="img"
            height="140"
            image="https://t4.ftcdn.net/jpg/04/40/22/63/240_F_440226335_OYwRDsUW3KSXQqrv0HBtqkmeiPTgN9qc.jpg"
            alt="visa card"
          />
          <CardContent>
            <Typography gutterBottom  component="div">
              Lizard
            </Typography>
            <Typography >
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: `50%`,
            height: "fill"
          }}
        >

        </Card>
      </Card>
    </Card>
  );
}