import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/utils/mongodb'
import { Cv } from '@/schema/create-cv'

export async function GET(): Promise<NextResponse> {
  try {
    await dbConnect()

    const cvData = await Cv.find({})

    return NextResponse.json(cvData)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    console.log('request =1', request);
    
    const body = await request.json()
    await dbConnect()

    const cvData = await Cv.create(body)

    console.log('cvData', cvData);
    

    return NextResponse.json(cvData, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}