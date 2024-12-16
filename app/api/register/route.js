// import { NextResponse } from "next/server";
// import { cookies } from 'next/headers'
// const pool = require('../../../util/db');

// export async function POST(req) {
//     const user = await req.json();
//     try {
//         const result = await pool.query(
//             `INSERT INTO member (
//                 id,
//                 name,
//                 member_status,
//                 phone,
//                 email,
//                 verified,
//                 permission,
//                 register_date,
//                 password
//             ) VALUES (
//                 gen_random_uuid(),
//                 $1,
//                 0,
//                 $2,
//                 $3,
//                 0,
//                 1,
//                 CURRENT_TIMESTAMP,
//                 $4
//             ) RETURNING id`,
//             [`${user.firstName} ${user.lastName}`, user.phone, user.email, user.password]
//         );

//         const userId = result.rows[0].id;

//         // 設置 cookies
//         cookies().set('userId', userId, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: 'strict',
//             maxAge: 60 * 60 * 24 * 7 // 7 天
//         });

//         return new NextResponse(JSON.stringify({ 
//             message: "註冊成功",
//             userId: userId
//         }), {
//             status: 201,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     } catch (error) {
//         console.error('Register error:', error);
//         return new NextResponse(JSON.stringify({ 
//             message: "註冊失敗",
//             error: error.message 
//         }), {
//             status: 400,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     }
// }