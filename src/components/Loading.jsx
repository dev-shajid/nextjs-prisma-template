import React from 'react'
import { ImSpinner8 } from 'react-icons/im'

export default function Loading() {
    return (
        <>
            <div className="inline-flex items-center justify-center text-2xl gap-3">
                <ImSpinner8 className="animate-spin" />
                <p>Loading</p>
            </div>
        </>
    )
}
