'use client'
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button } from '@/components';
import LoginCarousel from '../LoginCarousel';
import { createUser } from '@/actions/firebase-action';

export default function RegisterPage() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        const userData = {
          name,
          email,
          password,
        };

        console.log(userData)
    
        try {
          await createUser(userData);
          console.log('User created successfully');
        } catch (error) {
          console.error('Error creating user:', error);
        }
      };

  return (
    <div className="max-w-4xl flex flex-col justify-center items-center gap-8 m-auto p-4 pt-56">
          <Card className="w-full gap-8 border border-gray-200 p-6">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Name"
                                        name="name"
                                        autoComplete="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        className="w-full mt-4"
                                        size="md"
                                    >
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <LoginCarousel />
                    </Grid>
                </Grid>
            </form>
        </Card>
    </div>
  )
}