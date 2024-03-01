"use server"

import db from "@/lib/db"

export async function GetForms() {
    let user = await currentUser()
    if (!user) throw new Error()

    return await db.form.findMany({
        where: { userId: user.id },
        orderBy: [{ createdAt: "desc" }]
    })
}

export async function GetFormById(id) {
    let user = await currentUser()
    if (!user) throw new Error()

    return await db.form.findUnique({
        where: {
            userId: user.id,
            id:Number(id)
        }
    })
}