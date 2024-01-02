import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button } from '@/components';
import LoginCarousel from '../LoginCarousel';

export default function RegisterPage() {

  return (
    <div className="max-w-4xl flex flex-col justify-center items-center gap-8 m-auto p-4 pt-56">
          <Card className="w-full gap-8 border border-gray-200 p-6">
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
        </Card>
    </div>
  )
}