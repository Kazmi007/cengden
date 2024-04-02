'use client';

import { AppBar, Box, Button, Card, IconButton, Menu, MenuItem, Modal, Stack, Toolbar, Typography } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from "next/link";
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useState } from "react";
import { Item } from "./types/item";

export default function Home() {
  const { user } = useUser();
  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);

  const [items, setItems] = useState<null | Item[]>(null);
  const [selectedItem, setSelectedItem] = useState<null | Item>(null);

  useEffect(() => {
    fetch('/api/db/get-items', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items)
      })
  }, [])

  console.log(items);
  console.log(user);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuEl(null);
  };

  const openItem = (item: Item) => {
    setSelectedItem(item);
  }
  
  return (
    <Box display='flex' sx={{height: '100vh', width: '100vw', flexDirection: 'column'}}>
      <Box>
        <AppBar position="static">
          <Toolbar sx={{justifyContent: 'space-between'}}>
            <Typography>
              CENGden
            </Typography>
            {!user && <Link href="/api/auth/login">
              <Button color="inherit">Login</Button>
            </Link>}
            {user && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={menuEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={Boolean(menuEl)}
                  onClose={handleClose}
                >
                  {user.role === 'user' && <Link href="/my">
                    <MenuItem>My Items</MenuItem>
                  </Link>}
                  {user.role === 'admin' && <Link href="/users">
                    <MenuItem>Users</MenuItem>
                  </Link>}
                  <Link href="/api/auth/logout">
                    <MenuItem>Logout</MenuItem>
                  </Link>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box display='flex' sx={{ flexDirection: 'column', flexGrow: 1, py: '4rem', px: '8rem', bgcolor: 'white' }}>
        <Stack direction='row' sx={{ height: '80%', maxHeight: '80%', overflow: 'auto', gap: '2rem', flexWrap: 'wrap' }}>
          {items && items.map((item) => (
            <Card key={item._id} sx={{ width: '280px', height: 'fit-content', border: '1px solid #3F50B5', pb: '0.6rem', cursor: 'pointer' }} onClick={() => openItem(item)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', width: 'fit-content', gap: '1.5rem' }}>
                {item.image && <Image src={item.image} width={280} height={180} alt="product pic" style={{objectFit: "contain", objectPosition: 'center', width: '100%', height: '180px'}}  />}
                <Stack direction='column' sx={{ px:'0.5rem', gap: '0.1rem' }}>
                  <Typography variant="h5" sx={{ mb: '0.2rem' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: '0.2rem' }}>
                    Price: ${item.price}
                  </Typography>
                  {item.type && <Typography>
                    Type: {item.type}
                  </Typography>}
                  {item.brand && <Typography>
                    Brand: {item.brand}
                  </Typography>}
                  {item.model && <Typography>
                    Model: {item.model}
                  </Typography>}
                  {item.tutor_name && <Typography>
                    Tutor Name: {item.tutor_name}
                  </Typography>}
                  {item.lessons && item.lessons.length && <Typography>
                    Lessons: {item.lessons.join(', ')}
                  </Typography> }
                </Stack>
              </Box>
            </Card>
          ))}
        </Stack>
        <Modal
          open={Boolean(selectedItem)}
          onClose={() => setSelectedItem(null)}
          sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}
        >
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            color: 'black',
            borderRadius: '12px',
            boxShadow: 24,
            p: 3,
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', width: 'fit-content', gap: '1.5rem' }}>
              {selectedItem?.image && <Image src={selectedItem.image} width={280} height={180} alt="product pic" style={{objectFit: "contain", objectPosition: 'center', width: '100%', height: '180px'}}  />}
              <Stack direction='column' sx={{ px:'0.5rem', gap: '0.1rem' }}>
                <Typography variant="h5" sx={{ mb: '0.2rem' }}>
                  {selectedItem?.title}
                </Typography>
                <Typography variant="h6" sx={{ mb: '0.2rem' }}>
                  Price: ${selectedItem?.price}
                </Typography>
                {user && <Typography>
                  Owner: {selectedItem?.owner}
                </Typography>}
                {user && <Typography>
                  Owner number: {selectedItem?.owner_number}
                </Typography>}
                {selectedItem?.type && <Typography>
                  Type: {selectedItem.type}
                </Typography>}
                {selectedItem?.brand && <Typography>
                  Brand: {selectedItem.brand}
                </Typography>}
                {selectedItem?.model && <Typography>
                  Model: {selectedItem.model}
                </Typography>}
                {selectedItem?.tutor_name && <Typography>
                  Tutor Name: {selectedItem.tutor_name}
                </Typography>}
                {selectedItem?.lessons && selectedItem?.lessons.length && <Typography>
                  Lessons: {selectedItem.lessons.join(', ')}
                </Typography> }
                {selectedItem?.year && <Typography>
                  Year: {selectedItem.year}
                </Typography>}
                {selectedItem?.color && <Typography>
                  Color: {selectedItem.color}
                </Typography>}
                {selectedItem?.engine_disp && <Typography>
                  Engine Displacement: {selectedItem.engine_disp} cc
                </Typography>}
                {selectedItem?.fuel_type && <Typography>
                  Fuel Type: {selectedItem.fuel_type}
                </Typography>}
                {selectedItem?.transmission_type && <Typography>
                  Transmission Type: {selectedItem.transmission_type}
                </Typography>}
                {selectedItem?.mileage && <Typography>
                  Mileage: {selectedItem.mileage} km
                </Typography>}
                {selectedItem?.graphics_card && <Typography>
                  Graphics Card: {selectedItem.graphics_card}
                </Typography>}
                {selectedItem?.operating_system && <Typography>
                  Operating System: {selectedItem.operating_system}
                </Typography>}
                {selectedItem?.processor && <Typography>
                  Processor: {selectedItem.processor}
                </Typography>}
                {selectedItem?.ram && <Typography>
                  RAM: {selectedItem.ram}
                </Typography>}
                {selectedItem?.camera && <Typography>
                  Camera Specifications: {Object.entries(selectedItem.camera).map((entry: any) => `${entry[0]}: ${entry[1]}, `)}
                </Typography>}
                {selectedItem?.battery_capacity && <Typography>
                  Battery Capacity: {selectedItem.battery_capacity}
                </Typography>}
                {selectedItem?.location && <Typography>
                  Location: {selectedItem.location}
                </Typography>}
                {selectedItem?.duration && <Typography>
                  Duration: {selectedItem.duration}
                </Typography>}
                {selectedItem?.description && <Typography>
                  Description: {selectedItem.description}
                </Typography>}
              </Stack>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
