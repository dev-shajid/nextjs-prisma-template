'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { Register } from '../../../action/user'
import toast from 'react-hot-toast'

export default function page({ searchParams }) {
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState({ name: '', email: '', password: '' })

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        let loadingPromise = toast.loading("Loading...")
        try {
            e.preventDefault()
            setIsLoading(true)
            let res=await axios.post('/api/auth/register', values)
            // console.log(res.data)
            if (res.status == 200) {
                router.push(searchParams.callback || '/')
                toast.success(res?.data.message || "Registration Successful!", { id: loadingPromise })
            }
        } catch (error) {
            console.log({error})
            let res=error?.response?.data
            toast.error(res?.error || "Some error arised!", { id: loadingPromise })
        } finally{
            setIsLoading(false)
        }
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow max-w-[400px]">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                                <input
                                    type="name"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Jhon Doe"
                                    required
                                    onChange={handleChange}
                                    value={values.name}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com"
                                    required
                                    onChange={handleChange}
                                    value={values.email}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                    onChange={handleChange}
                                    value={values.password}
                                />
                            </div>
                            {/* <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                            </div> */}
                            <button
                                disabled={isLoading}
                                type="submit" className="w-full bg-black text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                {isLoading?'Loading...':'Sign up'}
                            </button>
                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet? <Link href="/signin" className="font-medium text-primary-600 hover:underline">Sign in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
