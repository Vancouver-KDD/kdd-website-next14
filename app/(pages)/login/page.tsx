'use client'
import React, { useState } from 'react';
import { Button } from '@/components';
import Link from 'next/link'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FaArrowUp } from "react-icons/fa";
import LoginCarousel from './LoginCarousel';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '@/actions/firebase';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const login = () => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
          .then(() => {
            toast.success('성공적으로 로그인되었습니다')
            router.push('/'); 
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.error(errorCode, errorMessage)
            toast.error('다시 시도해주세요')
          })
      }

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
                                    className="w-full mt-4 text-gray-700 bg-gray-200 hover:bg-gray-300"
                                    size="md"
                                    onClick={login}
                                >
                                    로그인
                                </Button>
                            </Grid>
                        </Grid>
                        <Link href="/login/register">
                            <Button
                                className="flex items-center gap-2 mt-3 w-full"
                                size="md"
                            >
                                <p>회원가입</p>
                            </Button>
                        </Link>
                        <div className="flex-center gap-2 mt-5">
                            <p className="text-center">아직 계정이 없으시면 회원가입을 눌러주세요</p>
                            <FaArrowUp className="text-[#F52763]" />
                        </div>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    </div>
  )
}