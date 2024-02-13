'use client'
import React, { useState } from 'react';
import {DB} from '@/app'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { Button } from '@/components';
import LoginCarousel from '../LoginCarousel';
import { createUser } from '@/actions/firebase-action';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const [user, setUser] = useState<DB.User>({
        name: {
            korean: "",
            english: "",
        },
        email: "",
        password: "",
    })

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const nameParts = name.split('.');
    
        if (nameParts.length === 2) {
            setUser(prevState => ({
                ...prevState,
                [nameParts[0]]: {
                    ...prevState[nameParts[0]],
                    [nameParts[1]]: value,
                }
            }));
        } else {
            setUser(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const { name, email, password } = user;

        const isAdmin = false;

        const userData = {
          name,
          email,
          password,
          isAdmin,
        };
    
        try {
          await createUser(userData);
          toast.success('회원가입이 완료되었습니다!');
          router.push('/login')
        } catch (error) {
          console.error('Error creating user:', error);
        }
      };

  return (
    <div className="max-w-4xl flex flex-col justify-center items-center gap-8 m-auto p-4 pt-56">
          <Card className="w-full gap-8 border border-gray-200 p-6 mt-4">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} className="mt-4">
                        <CardContent>
                            <Grid container spacing={2}>
                                <div className="flex gap-2 pl-4">
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            id="name-korean"
                                            label="한글이름(홍길동)"
                                            name="name.korean"
                                            value={user.name.korean}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            id="name-english"
                                            label="영문이름(John)"
                                            name="name.english"
                                            value={user.name.english}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </div>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
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
                                        value={user.password}
                                        onChange={handleChange}
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