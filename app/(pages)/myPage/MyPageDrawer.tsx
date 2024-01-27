'use client'
import * as React from 'react';
import { Suspense } from 'react'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import { user } from '@/stores'
import { useAtomValue } from 'jotai'
import { useSearchParams } from 'next/navigation'
import MyTickets from './MyTickets';
import Settings from './Settings';

const drawerWidth = 280;

interface Props {
  window?: () => Window;
}

export default function MyPageDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const userVal = useAtomValue(user)
  const currentUser = userVal;

 

  const searchParams = useSearchParams()
  const page = searchParams.get('page')

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 4) {
      return "Good Night..😴";
    } else if (currentHour < 12) {
      return "Good Morning..🌝";
    } else if (currentHour < 18) {
      return "Good Afternoon..🌞";
    } else if (currentHour < 22) {
      return "Good Evening..🌗";
    } else {
      return "Good Night..🥱";
    }
  };

  const menus = [
    { name: 'My Tickets', path: '/myPage?page=myTickets' },
    { name: 'Settings', path: '/myPage?page=settings' },
  ];

  const [name, setName] = React.useState('. . .');
  const [isClickedOnce, setIsClickedOnce] = React.useState(false);


  React.useEffect(() => {
    setName(currentUser?.name?.korean || '');
  }, [currentUser]);

  const handleChange = () => {
    if (isClickedOnce) {
      setName(currentUser?.name?.korean || '');
    } else {
      setName(currentUser?.name?.english || '');
    }
    setIsClickedOnce(!isClickedOnce);
  }
  
  const drawer = (
      <div className='mt-9 pl-16'>
      <Suspense fallback="loading...">
        <div className='flex justify-end'>
          <Switch onChange={handleChange}/>
        </div>
        <div className='flex justify-center'>
          <Card className='ml-8 px-4 py-2'>
            <h3 className="px-4 font-bold text-sm text-[#364656]">{getGreeting()}</h3>
              <h3 className="px-4 mt-0.5 font-extrabold text-lg text-[#035FB7]">{name} <span className='text-sm text-[#364656]'>님</span></h3>
          </Card>
        </div>
          <div className='w-full flex justify-end'>
            <List className='mt-3 w-3/4 mr-2'>
              {menus.map((menu, index) => (
                <ListItem key={menu.name} component="a" href={menu.path} className='hover:bg-blue-gray-50'>
                  <h1 className='font-semibold text-lg'>{menu.name}</h1>
                </ListItem>
              ))}
            </List>
          </div>
        </Suspense>
      </div>

  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: 'absolute', left: 0, top: 30 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, position: 'absolute', left: 0, top: 30 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {page === 'myTickets' && (<MyTickets />)}
        {page === 'settings' && <Settings />}
      </Box>
    </Box>
  );
}