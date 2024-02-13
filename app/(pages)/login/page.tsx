import React from 'react'
import { Button } from '@/components'
import { FaGoogle } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LoginCarousel from './LoginCarousel';

export default function LoginPage() {
  return (
    <div className="max-w-4xl flex flex-col justify-center items-center gap-8 m-auto p-4 pt-56">
        <Card className="w-full gap-8 border border-gray-200 p-6">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <LoginCarousel />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardContent>
                        <Grid container spacing={2}>
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
                                    className="w-full mt-4 text-gray-700 bg-gray-200 hover:bg-gray-300"
                                    size="md"
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                        <Button
                            className="flex items-center gap-2 mt-3 w-full"
                            size="md"
                        >
                            <FaGoogle />
                            <p>Login with a Google</p>
                        </Button>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    </div>
  )
}