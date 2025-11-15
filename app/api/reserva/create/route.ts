import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, createCalendarEvent, addToSheet } from '@/lib/google-services'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { nombre, email, telefono, personas, espacio, fecha, hora, paymentId } = data

    // Validate required fields
    if (!nombre || !email || !telefono || !personas || !espacio || !fecha || !hora) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const reserva = {
      id: `RES-${Date.now()}`,
      nombre,
      email,
      telefono,
      personas: parseInt(personas),
      espacio,
      fecha,
      hora,
      paymentId,
      createdAt: new Date().toISOString(),
    }

    // 1. Send confirmation email to customer
    await sendEmail({
      to: email,
      subject: 'Confirmación de Reserva - Bar Virtual',
      html: `
        <h1>¡Tu reserva está confirmada!</h1>
        <p>Hola ${nombre},</p>
        <p>Tu reserva ha sido confirmada exitosamente.</p>
        <h2>Detalles de la reserva:</h2>
        <ul>
          <li><strong>Número de reserva:</strong> ${reserva.id}</li>
          <li><strong>Fecha:</strong> ${fecha}</li>
          <li><strong>Hora:</strong> ${hora}</li>
          <li><strong>Espacio:</strong> ${espacio}</li>
          <li><strong>Personas:</strong> ${personas}</li>
        </ul>
        <p>¡Nos vemos pronto!</p>
        <p><strong>Bar Virtual</strong></p>
      `,
    })

    // 2. Send notification to bar manager
    const MANAGER_EMAIL = process.env.BAR_MANAGER_EMAIL
    if (MANAGER_EMAIL) {
      await sendEmail({
        to: MANAGER_EMAIL,
        subject: `Nueva Reserva - ${nombre}`,
        html: `
          <h1>Nueva reserva recibida</h1>
          <h2>Detalles:</h2>
          <ul>
            <li><strong>ID:</strong> ${reserva.id}</li>
            <li><strong>Nombre:</strong> ${nombre}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Teléfono:</strong> ${telefono}</li>
            <li><strong>Fecha:</strong> ${fecha}</li>
            <li><strong>Hora:</strong> ${hora}</li>
            <li><strong>Espacio:</strong> ${espacio}</li>
            <li><strong>Personas:</strong> ${personas}</li>
            <li><strong>ID de Pago:</strong> ${paymentId}</li>
          </ul>
        `,
      })
    }

    // 3. Create Google Calendar event
    await createCalendarEvent({
      summary: `Reserva: ${nombre} - ${personas} personas`,
      description: `Reserva en ${espacio}\nTeléfono: ${telefono}\nEmail: ${email}\nID: ${reserva.id}`,
      startDateTime: `${fecha}T${hora}:00`,
      endDateTime: `${fecha}T${hora.split(':')[0] === '23' ? '23:59' : (parseInt(hora.split(':')[0]) + 2).toString().padStart(2, '0') + ':00'}`,
      attendees: [email],
    })

    // 4. Add to Google Sheets
    await addToSheet({
      sheetName: 'Reservas',
      values: [
        reserva.id,
        nombre,
        email,
        telefono,
        personas.toString(),
        espacio,
        fecha,
        hora,
        paymentId || 'N/A',
        reserva.createdAt,
      ],
    })

    return NextResponse.json({
      success: true,
      reserva,
    })
  } catch (error) {
    console.error('[v0] Create reservation error:', error)
    return NextResponse.json(
      { error: 'Error al crear la reserva' },
      { status: 500 }
    )
  }
}
