import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, budget, timeline, message, projectType, description } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const contact = new Contact({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      service: service || projectType || '',
      budget: budget || '',
      timeline: timeline || '',
      message: message || description || '',
      projectType: projectType || '',
      description: description || '',
    });

    await contact.save();

    return NextResponse.json(
      { success: true, message: 'Contact request saved successfully.' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error saving contact request:', error);
    return NextResponse.json(
      { error: error?.message || 'Unable to save contact request.' },
      { status: 500 }
    );
  }
}
